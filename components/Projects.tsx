'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ProjectWithTopics } from '../app/api/projects/service';

export default function Projects({
  projects,
}: {
  projects: ProjectWithTopics[];
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState('false');
  useEffect(() => {
    // ! handle localStorage changes from
    // ! - toggleReducedMotion
    window.addEventListener('storage', () => {
      setPrefersReducedMotion(localStorage.prefersReducedMotion);
    });
    setPrefersReducedMotion(localStorage.prefersReducedMotion);
    return window.removeEventListener('storage', () => {});
  }, []);
  return (
    <>
      {projects?.map((project) => (
        <a
          key={project.id}
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <motion.div
            className="shadow-md border-2 rounded-sm cursor-pointer h-full 
            group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-purple-600 group-hover:to-purple-800
             group-active:bg-gradient-to-r group-active:from-indigo-600 group-active:via-purple-700 group-active:to-purple-900
          text-black dark:text-white border-black dark:border-white group-hover:!text-white group-active:!text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: {
                opacity: 0,
                scale: prefersReducedMotion === 'true' ? 1 : 0,
              },
            }}
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
                    className="rounded-sm mr-3 mb-2 px-2 inline-block italic border-2 border-black dark:border-white group-hover:border-white rounded-sm"
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
        </a>
      ))}
    </>
  );
}
