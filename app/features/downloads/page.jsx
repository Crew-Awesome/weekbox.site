import DownloadsFeature from './DownloadsFeature';
import { getLatestRelease } from '../../../lib/weekbox-release';

export const metadata = {
  title: 'Downloads | Weekbox',
  description: 'Download WeekBox for Windows, macOS, or Linux.',
};

export default async function DownloadsPage() {
  return <DownloadsFeature release={await getLatestRelease()} />;
}
