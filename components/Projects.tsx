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
            className="border-2 rounded-sm cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-600 hover:to-purple-800
            active:bg-gradient-to-r active:from-blue-600 active:via-purple-700 active:to-purple-900
          text-black dark:text-white ring-black dark:ring-white hover:!text-white active:!text-white"
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
                      className="rounded-sm mr-3 mb-2 inline italic"
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
