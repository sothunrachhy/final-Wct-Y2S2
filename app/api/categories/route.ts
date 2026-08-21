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

    return NextResponse.json(res.rows, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400, headers: corsHeaders() });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const res = await query(
      `INSERT INTO categories (name, slug, description) VALUES ($1, $2, $3) RETURNING *`,
      [name, slug, description || '']
    );

    return NextResponse.json(res.rows[0], { status: 201, headers: corsHeaders() });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500, headers: corsHeaders() });
  }
}

