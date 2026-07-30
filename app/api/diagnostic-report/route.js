export const runtime = "nodejs";

const MAX_STACK_TRACE_LENGTH = 3_800;
const MAX_REQUESTS_PER_WINDOW = 10;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const requestsByIp = new Map();

function text(value, maximumLength) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

function getAction(value) {
  if (typeof value === "string") return { label: text(value, 240), url: "" };
  if (!value || typeof value !== "object") return { label: "", url: "" };

  const label = text(value.label, 240);
  const candidateUrl = text(value.url, 2_000);
  try {
    const parsed = new URL(candidateUrl);
    return {
      label,
      url: parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : "",
    };
  } catch {
    return { label, url: "" };
  }
}

function escapeMarkdown(value) {
  return value.replace(/[\\`*_{}\[\]()<>#+\-.!|]/g, "\\$&");
}

function canSubmit(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const timestamps = (requestsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) return false;
  timestamps.push(now);
  requestsByIp.set(ip, timestamps);
  return true;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request) {
  if (!canSubmit(request)) {
    return Response.json({ error: "Too many reports" }, { status: 429, headers: corsHeaders() });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400, headers: corsHeaders() });
  }

  const appVersion = text(body.appVersion, 80);
  const operatingSystem = text(body.operatingSystem, 100);
  const architecture = text(body.architecture, 100);
  const stackTrace = text(body.stackTrace, MAX_STACK_TRACE_LENGTH);
  const action = getAction(body.action);
  if (!appVersion || !operatingSystem || !architecture || !stackTrace || !action.label) {
    return Response.json({ error: "Invalid diagnostic report" }, { status: 400, headers: corsHeaders() });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured");
    return Response.json({ error: "Diagnostic reporting is unavailable" }, { status: 503, headers: corsHeaders() });
  }

  const actionValue = action.url
    ? `[${escapeMarkdown(action.label)}](${action.url})`
    : escapeMarkdown(action.label);
  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "WeekBox diagnostic report",
          color: 0xf6c945,
          description: `**Stack trace**\n\`\`\`\n${stackTrace.replaceAll("```", "''' ")}\n\`\`\``,
          fields: [
            { name: "App version", value: `\`${escapeMarkdown(appVersion)}\``, inline: true },
            { name: "OS / architecture", value: `\`${escapeMarkdown(operatingSystem)} / ${escapeMarkdown(architecture)}\``, inline: true },
            { name: "Action", value: actionValue },
          ],
        },
      ],
    }),
  });

  if (!discordResponse.ok) {
    console.error("Discord diagnostic webhook failed", discordResponse.status);
    return Response.json({ error: "Diagnostic reporting failed" }, { status: 502, headers: corsHeaders() });
  }

  return Response.json({ accepted: true }, { status: 202, headers: corsHeaders() });
}
