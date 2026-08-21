import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { corsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    const res = await query(`
      SELECT 
        rev.id, 
        rev.recipe_id as "recipeId", 
        r.title as "recipeTitle", 
        rev.author, 
        rev.rating, 
        rev.comment, 
        rev.created_at as "createdAt"
      FROM reviews rev
      LEFT JOIN recipes r ON r.id = rev.recipe_id
      ORDER BY rev.created_at DESC
    `);

    return NextResponse.json(res.rows, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipeId, author, rating, comment } = body;

    if (!recipeId || !author || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400, headers: corsHeaders() });
    }

    const res = await query(
      `
      INSERT INTO reviews (recipe_id, author, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING id, author, rating, comment, created_at as "createdAt"
      `,
      [recipeId, author, rating, comment]
    );

    return NextResponse.json(res.rows[0], { status: 201, headers: corsHeaders() });
  } catch (error) {
    console.error('Error posting review:', error);
    return NextResponse.json({ error: 'Failed to post review' }, { status: 500, headers: corsHeaders() });
  }
}

