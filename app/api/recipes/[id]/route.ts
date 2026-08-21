import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { corsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idOrSlug = params.id;
    const isNumeric = /^\d+$/.test(idOrSlug);

    const sql = `
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
      WHERE ${isNumeric ? 'r.id = $1' : 'LOWER(r.slug) = $1'}
    `;

    const res = await query(sql, [isNumeric ? parseInt(idOrSlug) : idOrSlug.toLowerCase()]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json(res.rows[0], { headers: corsHeaders() });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipeId = parseInt(params.id);
    if (isNaN(recipeId)) {
      return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400, headers: corsHeaders() });
    }

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

    const catRes = await query(`SELECT id FROM categories WHERE slug = $1`, [categorySlug]);
    const categoryId = catRes.rows[0]?.id || null;

    const res = await query(
      `
      UPDATE recipes
      SET 
        title = COALESCE($1, title),
        khmer_title = COALESCE($2, khmer_title),
        description = COALESCE($3, description),
        prep_time = COALESCE($4, prep_time),
        cook_time = COALESCE($5, cook_time),
        servings = COALESCE($6, servings),
        category_id = COALESCE($7, category_id),
        category_slug = COALESCE($8, category_slug),
        image_url = COALESCE($9, image_url),
        ingredients = COALESCE($10, ingredients),
        instructions = COALESCE($11, instructions),
        tools = COALESCE($12, tools),
        is_featured = COALESCE($13, is_featured)
      WHERE id = $14
      RETURNING *
      `,
      [
        title,
        khmerTitle,
        description,
        prepTime ? parseInt(prepTime) : null,
        cookTime ? parseInt(cookTime) : null,
        servings,
        categoryId,
        categorySlug,
        imageUrl,
        ingredients ? JSON.stringify(ingredients) : null,
        instructions ? JSON.stringify(instructions) : null,
        tools ? JSON.stringify(tools) : null,
        isFeatured !== undefined ? Boolean(isFeatured) : null,
        recipeId,
      ]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json(res.rows[0], { headers: corsHeaders() });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500, headers: corsHeaders() });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipeId = parseInt(params.id);
    if (isNaN(recipeId)) {
      return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400, headers: corsHeaders() });
    }

    const res = await query(`DELETE FROM recipes WHERE id = $1 RETURNING id`, [recipeId]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json({ message: 'Recipe deleted successfully', id: recipeId }, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500, headers: corsHeaders() });
  }
}
