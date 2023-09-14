import { NextResponse } from 'next/server';
import { getFronter } from './service';

export async function GET() {
  const fronter = await getFronter();

  return NextResponse.json(fronter);
}
