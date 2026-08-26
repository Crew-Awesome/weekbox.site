import { getNewsPosts } from "../../../lib/news";
import NewsFeature from "./NewsFeature";

export const metadata = {
  title: "News | Weekbox",
  description: "WeekBox release notes, project updates, and community news.",
};

export const revalidate = 300;

export default async function NewsPage() {
  const posts = await getNewsPosts();
  return <NewsFeature posts={posts} />;
}
