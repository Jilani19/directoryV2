import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';
import { promisify } from 'util';

// Initialize connection to the robust SQLite database populated by the continuous aggregation engine
const dbPath = path.resolve(process.cwd(), '../server/prisma/dev.db');
const db = new sqlite3.Database(dbPath);

const dbAll = (sql: string, params: any[] = []): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows as any[]);
    });
  });
};

const dbGet = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search')?.toLowerCase() || '';
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '12');
  const category = searchParams.get('category');
  const country = searchParams.get('country');
  const sort = searchParams.get('sort') || 'a-z';
  const returnStats = searchParams.get('stats') === 'true';

  try {
    if (returnStats) {
      // Dynamic aggregation directly from the real engine database
      const statsRows = await dbAll(`
        SELECT cc.name as category, COUNT(c.id) as count 
        FROM Company c 
        JOIN _CompanyToCompanyCategory c2cc ON c.id = c2cc.A 
        JOIN CompanyCategory cc ON c2cc.B = cc.id 
        WHERE c.isDeleted = 0 AND c.isPublic = 1
        GROUP BY cc.name
      `) as any[];
      
      const countryRows = await dbAll(`
        SELECT co.name as country, COUNT(c.id) as count
        FROM Company c
        JOIN Country co ON c.countryId = co.id
        WHERE c.isDeleted = 0 AND c.isPublic = 1
        GROUP BY co.name
        ORDER BY count DESC
        LIMIT 20
      `) as any[];
      
      const totalRow = await dbGet(`SELECT COUNT(id) as total FROM Company WHERE isDeleted = 0 AND isPublic = 1`) as any;
      
      const counts: Record<string, any> = {
        total: totalRow?.total || 0,
        pharmaceuticals: 0,
        biotech: 0,
        injectables: 0,
        medicalDevices: 0,
        countries: countryRows.map((r: any) => ({ name: r.country, count: r.count })),
        totalCategories: statsRows.length
      };

      for (const row of statsRows) {
        if (row.category === 'Pharmaceuticals') counts.pharmaceuticals = row.count;
        if (row.category === 'Biotech') counts.biotech = row.count;
        if (row.category === 'Injectables') counts.injectables = row.count;
        if (row.category === 'Medical Devices') counts.medicalDevices = row.count;
      }
      
      return NextResponse.json(counts);
    }

    // Dynamic Filter Pipeline using native SQL for extreme performance
    let baseSql = `
      SELECT c.*, cc.name as categoryName, cc.slug as categorySlug, co.name as countryName
      FROM Company c
      LEFT JOIN _CompanyToCompanyCategory c2cc ON c.id = c2cc.A
      LEFT JOIN CompanyCategory cc ON c2cc.B = cc.id
      LEFT JOIN Country co ON c.countryId = co.id
      WHERE c.isDeleted = 0 AND c.isPublic = 1
    `;
    const params: any[] = [];
    
    // STRICT RULE: Never serve API / Bulk Drugs
    baseSql += ` AND (cc.name != 'API / Bulk Drugs' OR cc.name IS NULL)`;

    if (query) {
      baseSql += ` AND (LOWER(c.name) LIKE ? OR LOWER(co.name) LIKE ? OR LOWER(cc.name) LIKE ?)`;
      params.push(`%${query}%`, `%${query}%`, `%${query}%`);
    }

    if (category) {
      baseSql += ` AND cc.name = ?`;
      params.push(category);
    }

    if (country) {
      baseSql += ` AND LOWER(co.name) = ?`;
      params.push(country.toLowerCase());
    }

    // Count Total Query
    const countSql = `SELECT COUNT(*) as total FROM (${baseSql})`;
    const totalRow = await dbGet(countSql, params) as any;
    const total = totalRow?.total || 0;

    // Pagination & Sorting
    let orderByClause = ` ORDER BY c.name ASC`; // default A-Z
    switch(sort.toLowerCase()) {
      case 'z-a': orderByClause = ` ORDER BY c.name DESC`; break;
      case 'newest': orderByClause = ` ORDER BY c.createdAt DESC`; break;
      case 'oldest': orderByClause = ` ORDER BY c.createdAt ASC`; break;
      case 'featured': orderByClause = ` ORDER BY c.logoUrl DESC, c.name ASC`; break;
    }
    
    baseSql += `${orderByClause} LIMIT ? OFFSET ?`;
    params.push(pageSize, (page - 1) * pageSize);

    const paginatedData = await dbAll(baseSql, params) as any[];

    // Map rows to original UI expected object
    const mappedData = paginatedData.map(row => ({
      id: row.id,
      slug: row.slug || row.id,
      categorySlug: row.categorySlug || 'unknown',
      name: row.name,
      description: row.description,
      category: row.categoryName,
      industry: 'Life Sciences',
      country: row.countryName || 'Global',
      city: 'Various',
      state: 'N/A',
      employees: 'Unknown',
      website: row.website,
      certifications: ['Verified'],
      verified: row.status === 'VERIFIED',
      logoUrl: row.logoUrl,
      tier: row.tier,
      completenessScore: row.completenessScore,
      color: row.categoryName === 'Pharmaceuticals' ? 'indigo-600' : 'emerald-600',
      initials: row.name ? row.name.substring(0, 2).toUpperCase() : ''
    }));

    return NextResponse.json({
      data: mappedData,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(total / pageSize) || 1
    });

  } catch (error) {
    console.error("Database Query Failed:", error);
    return NextResponse.json({ error: "Failed to fetch companies from aggregation engine" }, { status: 500 });
  }
}
