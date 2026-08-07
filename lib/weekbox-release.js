export const RELEASE_CACHE_TAG = "weekbox-release";

const RELEASES_URL = "https://api.github.com/repos/Crew-Awesome/Weekbox/releases/latest";

export async function getLatestRelease() {
  try {
    const response = await fetch(RELEASES_URL, {
      headers: { Accept: "application/vnd.github+json" },
      // The release webhook clears this cache immediately; this is a fallback.
      next: { revalidate: 86_400, tags: [RELEASE_CACHE_TAG] },
    });
    return response.ok ? response.json() : null;
  } catch {
    return null;
  }
}
