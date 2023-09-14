import { NextResponse } from 'next/server';

export interface Topics {
  topics: string[];
}

export interface Project {
  id: number;
  html_url: string;
  name: string;
  description: string;
  updated_at: string;
}

export interface ProjectWithTopics extends Project, Topics {}

export async function getProjects() {
  const projectsRequest = await fetch(
    'https://codeberg.org/api/v1/users/juke/repos?limit=1312',
  );
  const projectsResponse: Project[] = await projectsRequest.json();
  const projectsSortedByDate = projectsResponse.sort(
    (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at),
  );
  const projectsWithTopics: ProjectWithTopics[] = await Promise.all(
    projectsSortedByDate.map(async (project: Project) => {
      const { topics } = (await (
        await fetch(
          `https://codeberg.org/api/v1/repos/juke/${project.name}/topics`,
        )
      ).json()) as Topics;
      return {
        ...project,
        topics,
      };
    }),
  );
  return projectsWithTopics;
}

export async function GET() {
  const projects = await getProjects();

  return NextResponse.json(projects);
}
