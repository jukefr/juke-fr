'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Projects({ projects }: any) {
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
                  scale: prefersReducedMotion === 'true' ? 1 : 0,
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
    </>
  );
}
