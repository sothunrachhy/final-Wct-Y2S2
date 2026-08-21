import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { corsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid review ID' }, { status: 400, headers: corsHeaders() });
    }

    const res = await query(`DELETE FROM reviews WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json({ message: 'Review deleted', id }, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500, headers: corsHeaders() });
  }
}
