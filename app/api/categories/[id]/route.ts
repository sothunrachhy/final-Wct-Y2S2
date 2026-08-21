import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { corsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400, headers: corsHeaders() });
    }

    const body = await request.json();
    const { name, description } = body;

    const slug = name
      ? name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : null;

    const res = await query(
      `
      UPDATE categories
      SET 
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description)
      WHERE id = $4
      RETURNING *
      `,
      [name, slug, description, id]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json(res.rows[0], { headers: corsHeaders() });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500, headers: corsHeaders() });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400, headers: corsHeaders() });
    }

    const res = await query(`DELETE FROM categories WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json({ message: 'Category deleted', id }, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500, headers: corsHeaders() });
  }
}
