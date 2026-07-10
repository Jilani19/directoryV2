/**
 * Nominatim Service (OpenStreetMap)
 * Geocodes an address string to latitude and longitude
 */
export async function getCoordinates(address: string): Promise<{ lat: number, lng: number } | null> {
  try {
    if (!address) return null;
    
    // OpenStreetMap Nominatim API
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    
    const res = await fetch(url, { 
      next: { revalidate: 86400 }, // geocode results are stable — cache for 24 hours
      headers: {
        'User-Agent': 'cGxPDirectoryBot/1.0 (contact@cgxp.directory)'
      }
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    
    return null;
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error("Nominatim geocoding error:", error);
    }
    return null;
  }
}

