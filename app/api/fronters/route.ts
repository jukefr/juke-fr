import { NextResponse } from 'next/server';

export interface Fronter {
  name: string;
  pronouns: string;
}

export interface FrontersResponse {
  members: Fronter[]
}

export async function getFronters() {
  const frontersQuery = await fetch('https://api.pluralkit.me/v2/systems/wzylv/fronters')
  const frontersResponse = await frontersQuery.json() as FrontersResponse
  return frontersResponse.members
}

export async function GET() {
  const fronters = await getFronters();

  return NextResponse.json(fronters);
}
