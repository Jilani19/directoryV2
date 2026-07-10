/**
 * News Service
 * Fetches latest company news from Yahoo Finance RSS feed.
 */

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  category: "Press Releases" | "Investor News" | "Media Coverage" | "Awards" | "Acquisitions" | "Research";
  summary?: string;
  source?: string;
  url?: string;
}

export async function getCompanyNews(tickerOrName: string): Promise<NewsItem[] | undefined> {
  try {
    // We'll use a public RSS-to-JSON API to avoid CORS and XML parsing issues on the client/edge
    // Note: In a real prod app, you might parse XML directly on the server.
    const query = encodeURIComponent(tickerOrName);
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
    
    // Use rss2json API to easily convert RSS to JSON
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, { 
      next: { revalidate: 21600 } // cache for 6 hours
    });
    
    if (!res.ok) {
      return undefined;
    }
    
    const data = await res.json();
    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      return undefined;
    }
    
    return data.items.slice(0, 6).map((item: { title: string; pubDate: string; thumbnail?: string; description?: string; author?: string; link: string }, index: number) => ({
      id: `news-${index}`,
      title: item.title,
      date: new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      image: item.thumbnail,
      category: "Media Coverage",
      summary: item.description?.replace(/<[^>]*>?/gm, '').substring(0, 120) + "...", // Strip HTML
      source: item.author || "Google News",
      url: item.link
    }));

  } catch (error) {
    console.error(`Error fetching news for ${tickerOrName}:`, error);
    return undefined;
  }
}
