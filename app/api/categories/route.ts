import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const res = await query(`
      SELECT 
        c.id, 
        c.name, 
        c.slug, 
        c.description,
        COUNT(r.id)::int as count
      FROM categories c
      LEFT JOIN recipes r ON r.category_slug = c.slug
      GROUP BY c.id, c.name, c.slug, c.description
      ORDER BY c.name ASC
    `);

    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
