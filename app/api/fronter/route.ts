import { NextResponse } from 'next/server';

export interface Fronter {
  name: string;
  pronouns: string;
}

export interface Fronters {
  members: Fronter[];
}

export async function getFronter() {
  const frontersRequest = await fetch(
    'https://api.pluralkit.me/v2/systems/wzylv/fronters',
  );
  const frontersResponse: Fronters = await frontersRequest.json();
  const fronter = frontersResponse.members.reduce(
    (acc: string, val) => `${val.name} (${val.pronouns}), ${acc}`,
    '',
  );
  return fronter;
}

export async function GET() {
  const fronter = await getFronter();

  return NextResponse.json(fronter);
}
