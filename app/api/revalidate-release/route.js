import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { RELEASE_CACHE_TAG } from '../../../lib/weekbox-release';

function hasValidSecret(request) {
  const expected = process.env.RELEASE_REVALIDATE_SECRET;
  const provided = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!expected || !provided) return false;

  const expectedBytes = Buffer.from(expected);
  const providedBytes = Buffer.from(provided);
  return expectedBytes.length === providedBytes.length && timingSafeEqual(expectedBytes, providedBytes);
}

export async function POST(request) {
  if (!hasValidSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // A release webhook needs the next visit to receive fresh release data.
  revalidateTag(RELEASE_CACHE_TAG, { expire: 0 });
  revalidatePath('/downloads');
  return NextResponse.json({ revalidated: true });
}
