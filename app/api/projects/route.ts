import { NextResponse } from 'next/server';

export interface Topics {
  topics: string[]
}

export interface Project {
  id: number;
  html_url: string;
  name: string;
  description: string;
  updated_at: string;
}

export interface ProjectWithTopics extends Project, Topics {}

export async function GET() {
  const rawProjects = await (
    await fetch('https://codeberg.org/api/v1/users/juke/repos?limit=1312')
  ).json() as Project[];

  const sorted = rawProjects.sort(
    (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at),
  );

  const withTopics = await Promise.all(
    sorted.map(async (project: Project) => {
      const { topics } = await (
        await fetch(
          `https://codeberg.org/api/v1/repos/juke/${project.name}/topics`,
        )
      ).json() as Topics;
      return {
        ...project,
        topics,
      };
    }),
  );

  return NextResponse.json(withTopics);
}
