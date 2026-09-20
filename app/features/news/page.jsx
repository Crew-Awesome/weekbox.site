import NewsFeature from './NewsFeature';
import { getNewsPosts } from '../../../lib/news';

export const metadata = {
  title: 'News | Weekbox',
  description: 'WeekBox release notes, project updates, and community news.',
};

export default async function NewsPage() {
  return <NewsFeature posts={await getNewsPosts()} />;
}
