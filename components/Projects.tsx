import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Project from './Project';
import { useAppSelector } from './store/hooks';
import { selectPrefersReducedMotion } from './store/prefersReducedMotion';

const Projects = ({ projects }: any) => {
  const badgeColor = useColorModeValue('purple', 'orange');
  const projectHoverBackground = useColorModeValue(
    'gray.100',
    'whiteAlpha.200',
  );
  const prefersReducedMotion = useAppSelector(selectPrefersReducedMotion);

  return (
    <SimpleGrid columns={[1, null, 3]} spacing={10}>
      <noscript>
        <style>
          {
            '\
          .imagineHavingJSDisabledIn2022 {\
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
          prefersReducedMotion={prefersReducedMotion}
          badgeColor={badgeColor}
        />
      ))}
    </SimpleGrid>
  );
};

export default Projects;
