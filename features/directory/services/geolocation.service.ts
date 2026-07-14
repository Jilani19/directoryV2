export interface GeolocationResult {
  latitude: number;
  longitude: number;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  display_name?: string;
}

export class GeolocationService {
  /**
   * Prompts the browser for current coordinates and reverse geocodes them via Nominatim
   */
  static async getCurrentLocation(): Promise<GeolocationResult> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocation is not supported by your browser"));
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await this.reverseGeocode(latitude, longitude);
            
            resolve({
              latitude,
              longitude,
              city: data.address?.city || data.address?.town || data.address?.village,
              district: data.address?.county || data.address?.state_district,
              state: data.address?.state,
              country: data.address?.country,
              display_name: data.display_name
            });
          } catch (err) {
            reject(err);
          }
        },
        (err) => reject(new Error(err.message)),
        { timeout: 10000 }
      );
    });
  }

  /**
   * Calls OpenStreetMap Nominatim for Reverse Geocoding
   */
  private static async reverseGeocode(latitude: number, longitude: number) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "en-US,en"
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    return response.json();
  }

  /**
   * Calls OpenStreetMap Nominatim to search for a location by query
   */
  static async searchLocation(query: string): Promise<GeolocationResult[]> {
    if (!query || query.trim().length < 2) return [];

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
      {
        headers: {
          "Accept-Language": "en-US,en"
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const data = await response.json();
    
     
    return data.map((item: any) => ({
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      city: item.address?.city || item.address?.town || item.address?.village,
      district: item.address?.county || item.address?.state_district,
      state: item.address?.state,
      country: item.address?.country,
      display_name: item.display_name
    }));
  }
}
