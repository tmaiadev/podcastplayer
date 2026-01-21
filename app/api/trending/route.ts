import { NextRequest, NextResponse } from 'next/server';
import { PodcastIndex } from '@/lib/podcast-index';
import { isValidLanguage } from '@/lib/i18n/constants';

function getFirstDayOfPreviousMonthEpoch(): number {
  const now = new Date();
  const firstDayPrevMonth = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth() - 1,
    1,
    0,
    0,
    0,
    0
  ));
  return Math.floor(firstDayPrevMonth.getTime() / 1000);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const cat = searchParams.get('cat');
  const lang = searchParams.get('lang') || 'en';
  const max = parseInt(searchParams.get('max') || '12', 10);

  if (!cat) {
    return NextResponse.json(
      { error: 'Missing required parameter: cat' },
      { status: 400 }
    );
  }

  if (!isValidLanguage(lang)) {
    return NextResponse.json(
      { error: 'Invalid language parameter' },
      { status: 400 }
    );
  }

  try {
    const api = new PodcastIndex();
    const podcasts = await api.getTrending({
      max,
      cat,
      lang,
      since: getFirstDayOfPreviousMonthEpoch(),
    });

    return NextResponse.json({ podcasts });
  } catch (error) {
    console.error('Error fetching trending podcasts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending podcasts' },
      { status: 500 }
    );
  }
}
