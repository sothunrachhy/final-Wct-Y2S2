import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipeId, author, rating, comment } = body;

    if (!recipeId || !author || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    const res = await query(
      `
      INSERT INTO reviews (recipe_id, author, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING id, author, rating, comment, created_at as "createdAt"
      `,
      [recipeId, author, rating, comment]
    );

    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error posting review:', error);
    return NextResponse.json({ error: 'Failed to post review' }, { status: 500 });
  }
}
