'use client';

import { motion } from 'framer-motion';
import { getFromLocalStorage } from './store';

import { useEffect, useState } from 'react';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((res) => {
        setProjects(res);
      });
  }, []);

  return projects.length ? (
    <div className="flex align-center justify-center flex-col mb-12 md:container md:mx-auto">
      <h2 className="text-2xl font-bold">random projects</h2>
      <p className="text-xl">
        i mean not so random, sorted by most recently worked on (mostly,
        usually)
      </p>
      <hr className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-evenly">
        {projects?.map((project: any) => (
          <a
            key={project.id}
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="border-2 rounded-sm cursor-pointer hover:bg-purple-200 active:bg-purple-300
            dark:hover:bg-purple-800 dark:active:bg-purple-900"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                variants={{
                  visible: { opacity: 1, scale: 1 },
                  hidden: {
                    opacity: 0,
                    scale: getFromLocalStorage()?.prefersReducedMotion ? 1 : 0,
                  },
                }}
                className="jsDisabled"
              >
                {/* <LazyLoadImage */}
                {/*   alt={project.description} */}
                {/*   src={project.avatar_url} */}
                {/*   height="auto" */}
                {/*   width="100%" */}
                {/* /> */}

                <div className="p-6">
                  <h3 className="my-1 font-semibold text-lg">{project.name}</h3>
                  <div className="items-baseline">
                    {project.topics.map((topic: string) => (
                      <div
                        key={`${project.id}-${topic}`}
                        className="rounded-sm px-2 mr-1 mb-2 text-purple-600 dark:text-purple-200 inline"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                  <hr className="my-1" />
                  <div>
                    <p>{project.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </a>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex align-center justify-center flex-col mb-12 md:container md:mx-auto">
      <p className="text-xl text-center">loading projects</p>
    </div>
  );
}
