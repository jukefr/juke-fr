import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const rawProjects = await (
    await fetch('https://code.juke.fr/api/v1/users/kay/repos?limit=1312')
  ).json();

  const sorted = rawProjects.sort(
    (a: any, b: any) => Date.parse(b.updated_at) - Date.parse(a.updated_at),
  );

  const withTopics = await Promise.all(
    sorted.map(async (project: any) => {
      const { topics } = await (
        await fetch(
          `https://code.juke.fr/api/v1/repos/kay/${project.name}/topics`,
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
