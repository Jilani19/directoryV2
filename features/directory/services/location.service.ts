export interface LocationSearchResult {
  id: string;
  city: string;
  state: string;
  country: string;
  display_name: string;
  lat: number;
  lon: number;
}

export class LocationService {
  /**
   * Searches for a location (city/state) using OpenStreetMap Nominatim
   */
  static async searchLocation(query: string): Promise<LocationSearchResult[]> {
    if (!query || query.trim().length < 3) return [];

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
        {
          headers: {
            "Accept-Language": "en-US,en"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search location");
      }

      const data = await response.json();
      
       
      return data.map((item: any) => {
        let city = item.address?.city || item.address?.town || item.address?.village || item.address?.county;
        
        // If it's a country, city shouldn't fallback to item.name
        if (item.addresstype === "country") {
          city = undefined;
        } else if (!city && (item.addresstype === "city" || item.addresstype === "town")) {
          city = item.name;
        }
        
        return {
          id: item.place_id,
          city: city,
          state: item.address?.state,
          country: item.address?.country || (item.addresstype === "country" ? item.name : undefined),
          display_name: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon)
        };
      });
    } catch (err) {
      console.error("Location search error:", err);
      return [];
    }
  }
}
