import { randomBytes } from "node:crypto";

const COOKIE_NAME = "decap_oauth_state";
const COOKIE_MAX_AGE = 600;

function missingConfiguration() {
  return new Response("Decap GitHub OAuth is not configured.", { status: 503 });
}

function callbackUrl(request) {
  return new URL("/api/decap/callback", request.url).toString();
}

function cookieValue(request) {
  return request.cookies.get(COOKIE_NAME)?.value || "";
}

function oauthResult(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const safeMessage = JSON.stringify(message).replace(/</g, "\\u003c");
  return new Response(
    `<!doctype html><html><body><p>Finishing GitHub sign-in…</p><script>
      (() => {
        const payload = ${safeMessage};
        const opener = window.opener;
        if (!opener) {
          document.body.innerHTML = "<p>GitHub sign-in finished. Close this tab and return to the CMS.</p>";
          return;
        }
        const origin = window.location.origin;
        const receiveMessage = (event) => {
          if (event.source !== opener || event.origin !== origin || event.data !== "authorizing:github") return;
          window.removeEventListener("message", receiveMessage);
          opener.postMessage(payload, origin);
          window.close();
        };
        window.addEventListener("message", receiveMessage);
        opener.postMessage("authorizing:github", origin);
      })();
    </script></body></html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'",
      },
    },
  );
}

export async function GET(request, { params }) {
  const { action } = await params;
  const clientId = process.env.DECAP_GITHUB_CLIENT_ID;
  const clientSecret = process.env.DECAP_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) return missingConfiguration();

  if (action === "auth") {
    const state = randomBytes(24).toString("hex");
    const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
    authorizeUrl.searchParams.set("client_id", clientId);
    authorizeUrl.searchParams.set("redirect_uri", callbackUrl(request));
    authorizeUrl.searchParams.set("scope", "public_repo");
    authorizeUrl.searchParams.set("state", state);
    return new Response(null, {
      status: 302,
      headers: {
        Location: authorizeUrl.toString(),
        "Set-Cookie": `${COOKIE_NAME}=${state}; Path=/api/decap; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`,
      },
    });
  }

  if (action !== "callback") return new Response("Not found", { status: 404 });

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  if (error) return oauthResult("error", { error });
  if (!code || !state || state !== cookieValue(request)) return new Response("Invalid OAuth state.", { status: 400 });

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: callbackUrl(request) }),
  });
  const token = await tokenResponse.json();
  if (!tokenResponse.ok || !token.access_token) {
    console.error("Decap GitHub OAuth token exchange failed", token);
    return oauthResult("error", { error: "GitHub authorization failed" });
  }
  return oauthResult("success", { token: token.access_token, provider: "github" });
}
