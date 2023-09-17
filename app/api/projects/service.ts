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
  try {
    const projectsRequest = await fetch(
      'https://codeberg.org/api/v1/users/juke/repos?limit=1312',
      { next: { revalidate: 3600 } },
    );
    const projectsResponse: Project[] = await projectsRequest.json();

    const projectsSortedByDate = projectsResponse.sort(
      (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at),
    );

    const projectsWithTopics: ProjectWithTopics[] = await Promise.all(
      projectsSortedByDate.map(async (project: Project) => {
        try {
          const { topics } = (await (
            await fetch(
              `https://codeberg.org/api/v1/repos/juke/${project.name}/topics`,
            )
          ).json()) as Topics;
          return {
            ...project,
            topics,
          };
        } catch (err) {
          console.error(
            `Something went wrong fetching topics for ${project.name}...`,
          );
          if (err instanceof Error) console.error(err.message);
        }
        return {
          ...project,
          topics: [],
        };
      }),
    );
    return projectsWithTopics;
  } catch (err) {
    console.error('Something went wrong fetching projects...');
    if (err instanceof Error) console.error(err.message);
  }
  return [];
}
