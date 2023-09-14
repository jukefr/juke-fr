import { NextResponse } from 'next/server';
import { getProjects } from './service';

export async function GET() {
  const projects = await getProjects();

  return NextResponse.json(projects);
}
