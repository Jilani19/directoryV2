import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Background updater endpoint designed to be called by a cron scheduler (e.g., Vercel Cron).
 * Triggers a cache invalidation for the company details pages, forcing them to re-fetch
 * data from the external APIs (Wikipedia, Wikidata, FDA, ClinicalTrials) on the next visit.
 */
export async function GET(request: Request) {
  try {
    // Basic security check to ensure this is only called by an authorized cron job
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Revalidate the dynamic company routes
    // This tells Next.js to purge the Data Cache for these routes
    revalidatePath('/company/[slug]', 'page');

    return NextResponse.json({ 
      success: true, 
      message: 'Company cache revalidation triggered successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal Server Error' 
    }, { status: 500 });
  }
}
