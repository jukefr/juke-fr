import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const fronters = await (
    await fetch('https://api.pluralkit.me/v2/systems/wzylv/fronters')
  ).json();

  return NextResponse.json(fronters);
}
