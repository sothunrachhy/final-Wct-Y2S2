import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { corsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    let sql = `
      SELECT 
        r.id, 
        r.slug, 
        r.title, 
        r.khmer_title as "khmerTitle", 
        r.description, 
        r.prep_time as "prepTime", 
        r.cook_time as "cookTime", 
        r.servings, 
        r.category_slug as "categorySlug",
        c.name as "categoryName",
        r.image_url as "imageUrl", 
        r.ingredients, 
        r.instructions, 
        r.tools, 
        r.is_featured as "isFeatured",
        r.created_at as "createdAt"
      FROM recipes r
      LEFT JOIN categories c ON c.slug = r.category_slug
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category && category !== 'all') {
      params.push(category.toLowerCase());
      sql += ` AND LOWER(r.category_slug) = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      sql += ` AND (LOWER(r.title) LIKE $${params.length} OR LOWER(r.description) LIKE $${params.length} OR LOWER(COALESCE(r.khmer_title, '')) LIKE $${params.length})`;
    }

    if (featured === 'true') {
      sql += ` AND r.is_featured = TRUE`;
    }

    sql += ` ORDER BY r.id ASC`;

    const res = await query(sql, params);
    return NextResponse.json(res.rows, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      khmerTitle,
      description,
      prepTime,
      cookTime,
      servings,
      categorySlug,
      imageUrl,
      ingredients,
      instructions,
      tools,
      isFeatured,
    } = body;

    if (!title || !description || !categorySlug || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders() });
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now();

    // Check category_id
    const catRes = await query(`SELECT id FROM categories WHERE slug = $1`, [categorySlug]);
    const categoryId = catRes.rows[0]?.id || null;

    const res = await query(
      `
      INSERT INTO recipes (
        slug, title, khmer_title, description, prep_time, cook_time, servings,
        category_id, category_slug, image_url, ingredients, instructions, tools, is_featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
      `,
      [
        slug,
        title,
        khmerTitle || '',
        description,
        parseInt(prepTime) || 15,
        parseInt(cookTime) || 20,
        servings || '4 servings',
        categoryId,
        categorySlug,
        imageUrl,
        JSON.stringify(ingredients || []),
        JSON.stringify(instructions || []),
        JSON.stringify(tools || []),
        isFeatured ? true : false,
      ]
    );

    return NextResponse.json(res.rows[0], { status: 201, headers: corsHeaders() });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500, headers: corsHeaders() });
  }
}

