import HomeFeature from './features/home/HomeFeature';
import { getLatestRelease } from '../lib/weekbox-release';

export default async function Home() {
  const release = await getLatestRelease();
  const assets = release?.assets ?? [];
  return <HomeFeature assets={assets} />;
}
