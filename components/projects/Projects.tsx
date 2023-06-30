import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Project from './Project';

const Projects = (
  { projects, store }: any, // TODO: store type
) => {
  const badgeColor = useColorModeValue('purple', 'orange');
  const projectHoverBackground = useColorModeValue(
    'gray.100',
    'whiteAlpha.200',
  );
  return (
    <SimpleGrid
      columns={[1, null, 3]}
      spacing={10}
      templateRows="masonry" // won't work until 2050 or something
    >
      <noscript>
        <style>
          {
            '\
          .jsDisabled {\
            opacity: 1 !important;\
            transform: scale(1) !important;\
          }\
          '
          }
        </style>
      </noscript>
      {projects.map((project: any) => (
        <Project
          key={project.id}
          project={project}
          projectHoverBackground={projectHoverBackground}
          prefersReducedMotion={store.getter.prefersReducedMotion}
          badgeColor={badgeColor}
        />
      ))}
    </SimpleGrid>
  );
};

export default Projects;
