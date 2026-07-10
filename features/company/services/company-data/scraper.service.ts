import * as cheerio from 'cheerio';

export interface ScrapedData {
  facilities: { name: string, city?: string, country?: string, type?: string }[];
  certifications: { name: string, authority: string }[];
}

export async function scrapeCompanyWebsite(url: string | undefined, companyName: string): Promise<ScrapedData> {
  const result: ScrapedData = { facilities: [], certifications: [] };
  
  if (!url) return result;
  
  // Format the URL
  let targetUrl = url;
  if (!targetUrl.startsWith('http')) {
    targetUrl = `https://${targetUrl}`;
  }

  const pathsToScrape = ['/about', '/manufacturing', '/locations', '/contact', '/sustainability'];
  
  // Scrape up to 3 paths to keep it reasonably fast
  for (const path of pathsToScrape.slice(0, 3)) {
    try {
      const fetchUrl = `${targetUrl.replace(/\/$/, '')}${path}`;
      const res = await fetch(fetchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; cGxPBot/1.0; +http://cgxp.directory)'
        },
        // Don't wait too long for scraping to avoid locking up the whole request
        signal: AbortSignal.timeout(5000),
        next: { revalidate: 86400 }
      });
      
      if (!res.ok) continue;
      
      const html = await res.text();
      const $ = cheerio.load(html);
      
      // Strip scripts and styles
      $('script, style, nav, footer').remove();
      
      const pageText = $('body').text().replace(/\s+/g, ' ');
      
      // Basic keyword scanning for Certifications
      const certKeywords = [
        { match: /FDA/i, auth: "US FDA", name: "FDA Approved Facility" },
        { match: /EMA/i, auth: "EMA", name: "EMA GMP Compliance" },
        { match: /WHO GMP/i, auth: "WHO", name: "WHO GMP Certificate" },
        { match: /ISO 9001/i, auth: "ISO", name: "ISO 9001: Quality Management" },
        { match: /ISO 14001/i, auth: "ISO", name: "ISO 14001: Environmental" },
        { match: /ISO 13485/i, auth: "ISO", name: "ISO 13485: Medical Devices" },
        { match: /MHRA/i, auth: "MHRA", name: "MHRA Approved" },
        { match: /PIC\/S/i, auth: "PIC/S", name: "PIC/S Compliant" },
        { match: /Health Canada/i, auth: "Health Canada", name: "Health Canada Approved" }
      ];

      certKeywords.forEach(cert => {
        if (cert.match.test(pageText)) {
          if (!result.certifications.find(c => c.name === cert.name)) {
            result.certifications.push({ name: cert.name, authority: cert.auth });
          }
        }
      });

      // Basic extraction for Facilities (looking for "manufacturing facility in X")
      const facilityRegex = /manufacturing (?:facility|site|plant) (?:located )?in ([A-Z][a-z]+(?: [A-Z][a-z]+)?)/gi;
      let match;
      while ((match = facilityRegex.exec(pageText)) !== null) {
        const location = match[1];
        const facName = `${companyName} ${location} Facility`;
        if (!result.facilities.find(f => f.name === facName)) {
          result.facilities.push({
            name: facName,
            city: location,
            type: 'Manufacturing'
          });
        }
      }

      // Look for R&D Centers
      const rdRegex = /R&D (?:center|facility) (?:located )?in ([A-Z][a-z]+(?: [A-Z][a-z]+)?)/gi;
      while ((match = rdRegex.exec(pageText)) !== null) {
        const location = match[1];
        const facName = `${companyName} ${location} R&D Center`;
        if (!result.facilities.find(f => f.name === facName)) {
          result.facilities.push({
            name: facName,
            city: location,
            type: 'R&D'
          });
        }
      }

    } catch {
      // Ignore scraping errors (timeout, cors, etc)
    }
  }

  return result;
}
