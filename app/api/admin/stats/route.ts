import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { corsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    const recipesRes = await query(`SELECT COUNT(*)::int as count FROM recipes`);
    const categoriesRes = await query(`SELECT COUNT(*)::int as count FROM categories`);
    const reviewsRes = await query(`SELECT COUNT(*)::int as count, ROUND(AVG(rating), 1)::float as avg_rating FROM reviews`);
    const featuredRes = await query(`SELECT COUNT(*)::int as count FROM recipes WHERE is_featured = TRUE`);

    const stats = {
      totalRecipes: recipesRes.rows[0]?.count || 0,
      totalCategories: categoriesRes.rows[0]?.count || 0,
      totalReviews: reviewsRes.rows[0]?.count || 0,
      averageRating: reviewsRes.rows[0]?.avg_rating || 5.0,
      featuredRecipes: featuredRes.rows[0]?.count || 0,
    };

    return NextResponse.json(stats, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500, headers: corsHeaders() });
  }
}
