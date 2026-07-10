import { CompanyDetails } from '../../types';

const RXNAV_API = 'https://rxnav.nlm.nih.gov/REST';

export async function enhanceProductsWithRxNorm(products: NonNullable<CompanyDetails['productsList']>): Promise<NonNullable<CompanyDetails['productsList']>> {
  try {
    if (!products || products.length === 0) return products;
    
    const fetchPromises = products.map(async (prod) => {
      if (!prod.name || prod.name === 'N/A') return prod;
      
      const searchUrl = `${RXNAV_API}/rxcui.json?name=${encodeURIComponent(prod.name)}&search=1`;
      
      try {
        const res = await fetch(searchUrl, { next: { revalidate: 86400 } });
        
        if (res.ok) {
          const data = await res.json();
          if (data.idGroup && data.idGroup.rxnormId && data.idGroup.rxnormId.length > 0) {
            prod.description = (prod.description || '') + ` | RxCUI: ${data.idGroup.rxnormId[0]}`;
          }
        }
      } catch {
        // silently ignore per-product failures
      }
      
      return prod;
    });

    const enhancedProducts = await Promise.all(fetchPromises);
    return enhancedProducts;
  } catch (error) {
    console.error(`Error enhancing products with RxNorm:`, error);
    return products;
  }
}

