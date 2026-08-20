import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const recipeRes = await query(
      `
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
      WHERE LOWER(r.slug) = $1
      `,
      [slug.toLowerCase()]
    );

    if (recipeRes.rows.length === 0) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    const recipe = recipeRes.rows[0];

    // Fetch reviews for this recipe
    const reviewsRes = await query(
      `
      SELECT 
        id, 
        author, 
        rating, 
        comment, 
        created_at as "createdAt"
      FROM reviews
      WHERE recipe_id = $1
      ORDER BY created_at DESC
      `,
      [recipe.id]
    );

    recipe.reviews = reviewsRes.rows;

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe by slug:', error);
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}
