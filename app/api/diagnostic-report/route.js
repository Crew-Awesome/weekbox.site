import { getLatestRelease } from "../../../lib/weekbox-release";

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

function codeValue(value, maximumLength = 1_024) {
  const normalized = text(value, maximumLength).replaceAll("`", "'");
  return normalized ? `\`${normalized}\`` : "Unknown";
}

function normalizeVersion(value) {
  return value.trim().replace(/^v/i, "");
}

async function getLatestVersion() {
  const release = await getLatestRelease();
  return typeof release?.tag_name === "string" ? normalizeVersion(release.tag_name) : "";
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
  const item = text(body.item, 240);
  const version = text(body.version, 80);
  const storagePath = text(body.storagePath, 1_000);
  const issue = text(body.issue, 240);
  const title = text(body.title, 240);
  const summary = text(body.summary, 1_024);
  const errorMessage = text(body.errorMessage, 1_024);
  const reportedAt = text(body.reportedAt, 80);
  if (!appVersion || !operatingSystem || !architecture || !stackTrace || !action.label) {
    return Response.json({ error: "Invalid diagnostic report" }, { status: 400, headers: corsHeaders() });
  }

  const latestVersion = await getLatestVersion();
  if (!latestVersion) {
    console.error("Unable to determine the latest WeekBox release");
    return Response.json({ error: "Diagnostic reporting is temporarily unavailable" }, { status: 503, headers: corsHeaders() });
  }

  if (normalizeVersion(appVersion) !== latestVersion) {
    return Response.json(
      { error: "Diagnostic reports are accepted only from the latest version" },
      { status: 409, headers: corsHeaders() },
    );
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured");
    return Response.json({ error: "Diagnostic reporting is unavailable" }, { status: 503, headers: corsHeaders() });
  }

  const actionValue = action.url
    ? `[${escapeMarkdown(action.label)}](${action.url})`
    : escapeMarkdown(action.label);
  const fields = [
    { name: "App version", value: codeValue(appVersion), inline: true },
    {
      name: "OS / architecture",
      value: `${codeValue(operatingSystem)} / ${codeValue(architecture)}`,
      inline: true,
    },
    { name: "Action", value: actionValue },
  ];
  if (item) fields.push({ name: "Item", value: codeValue(item) });
  if (version) fields.push({ name: "Version", value: codeValue(version) });
  if (storagePath)
    fields.push({ name: "Storage path", value: codeValue(storagePath) });
  if (title) fields.push({ name: "Error title", value: codeValue(title) });
  if (issue) fields.push({ name: "Issue", value: codeValue(issue) });
  if (summary)
    fields.push({ name: "What happened", value: codeValue(summary) });
  if (errorMessage)
    fields.push({ name: "Error", value: codeValue(errorMessage) });
  if (reportedAt)
    fields.push({ name: "Reported at", value: codeValue(reportedAt) });
  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "WeekBox diagnostic report",
          color: 0xf6c945,
          description: `**Stack trace**\n\`\`\`\n${stackTrace.replaceAll("```", "''' ")}\n\`\`\``,
          fields,
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
