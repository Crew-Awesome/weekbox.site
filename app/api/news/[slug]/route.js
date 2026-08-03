import { getNewsPost, toPublicPost } from "../../../../lib/news";

export const revalidate = 300;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
};

export async function GET(_request, { params }) {
  try {
    const { slug } = await params;
    const post = await getNewsPost(slug);
    if (!post) return Response.json({ error: "News post not found" }, { status: 404, headers });
    return Response.json({ post: toPublicPost(post), body: post.body }, { headers });
  } catch (error) {
    console.error("Unable to load news post", error);
    return Response.json({ error: "News is temporarily unavailable" }, { status: 503, headers });
  }
}
