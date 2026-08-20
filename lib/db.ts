import { Pool } from 'pg';
import { CATEGORIES_SEED, RECIPES_SEED, REVIEWS_SEED } from './seedData';

let pool: Pool | null = null;

export function getPgPool(): Pool {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_xiTR0L1wUlnj@ep-hidden-grass-azffnuf8-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

  pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  return pool;
}

export async function query(text: string, params: any[] = []): Promise<{ rows: any[] }> {
  try {
    const activePool = getPgPool();
    const result = await activePool.query(text, params);
    return { rows: result.rows };
  } catch (err) {
    console.error('Neon PostgreSQL query error, returning fallback:', err);
    
    // Fallback SQL parser if offline
    const lowerText = text.toLowerCase().trim();

    if (lowerText.includes('from categories')) {
      return { rows: CATEGORIES_SEED };
    }

    if (lowerText.includes('where lower(r.slug) = $1')) {
      const slugArg = (params[0] || '').toLowerCase();
      const recipe = RECIPES_SEED.find((r) => r.slug.toLowerCase() === slugArg);
      return { rows: recipe ? [recipe] : [] };
    }

    if (lowerText.includes('from reviews')) {
      const recipeId = params[0];
      return { rows: REVIEWS_SEED[recipeId] || [] };
    }

    let result = [...RECIPES_SEED];
    if (lowerText.includes('is_featured = true')) {
      result = result.filter((r) => r.isFeatured);
    }
    return { rows: result };
  }
}
