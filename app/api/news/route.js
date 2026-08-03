import { getNewsPosts, toPublicPost } from "../../../lib/news";

export const revalidate = 300;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers });
}

export async function GET() {
  try {
    const posts = await getNewsPosts();
    return Response.json(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        posts: posts.slice(0, 24).map(toPublicPost),
      },
      { headers },
    );
  } catch (error) {
    console.error("Unable to load news feed", error);
    return Response.json({ error: "News is temporarily unavailable" }, { status: 503, headers });
  }
}
