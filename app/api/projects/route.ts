import { NextResponse } from 'next/server';

export async function GET() {
  const rawProjects = await (
    await fetch('https://codeberg.org/api/v1/users/juke/repos?limit=1312')
  ).json();

  const sorted = rawProjects.sort(
    (a: any, b: any) => Date.parse(b.updated_at) - Date.parse(a.updated_at),
  );

  const withTopics = await Promise.all(
    sorted.map(async (project: any) => {
      const { topics } = await (
        await fetch(
          `https://codeberg.org/api/v1/repos/juke/${project.name}/topics`,
        )
      ).json();
      return {
        ...project,
        topics,
      };
    }),
  );

  return NextResponse.json(withTopics);
}
