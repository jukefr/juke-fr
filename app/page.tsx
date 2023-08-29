import Projects from '../components/Projects';
import { GET as getProjects } from './api/projects/route';

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
  const projects = await getProjects().then((res) => res.json());

  return projects.length ? (
    <div className="flex align-center justify-center flex-col mb-12 md:container md:mx-auto">
      <h2 className="text-2xl font-bold">random projects</h2>
      <p className="text-xl">
        i mean not so random, sorted by most recently worked on (mostly,
        usually)
      </p>
      <hr className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-evenly">
        <Projects projects={projects} />
      </div>
    </div>
  ) : (
    <div className="flex align-center justify-center flex-col mb-12 md:container md:mx-auto">
      <p className="text-xl text-center">loading projects</p>
    </div>
  );
}
