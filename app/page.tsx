'use client';

import {
  useColorModeValue,
  Container,
  Heading,
  Divider,
  Flex,
  SimpleGrid,
  Badge,
  Box,
  Text,
} from '@chakra-ui/react';
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

  const badgeColor = useColorModeValue('purple', 'orange');
  const projectHoverBackground = useColorModeValue(
    'gray.100',
    'whiteAlpha.200',
  );

  return projects.length ? (
    <>
      <Container>
        <Heading as="h2" size="xl">
          random projects
        </Heading>
        <Text fontSize="xl">
          i mean not so random, sorted by most recently worked on
        </Text>
        <Divider mb={6} />
      </Container>

      <Flex alignItems="center" justifyContent="center" direction="column">
        <Flex direction="column" rounded={6} mb={12}>
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
            {projects?.map((project: any) => (
              <a
                key={project.id}
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  borderTop={'lg'}
                  roundedTop={'lg'}
                  sx={{ cursor: 'pointer' }}
                  _hover={{ bg: projectHoverBackground }}
                  _focus={{ boxShadow: 'outline' }}
                  _active={{ boxShadow: 'outline' }}
                  style={{ overflow: 'hidden' }}
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
                        scale: getFromLocalStorage()?.prefersReducedMotion
                          ? 1
                          : 0,
                      },
                    }}
                    className="jsDisabled"
                    style={{}}
                  >
                    {/* <LazyLoadImage */}
                    {/*   alt={project.description} */}
                    {/*   src={project.avatar_url} */}
                    {/*   height="auto" */}
                    {/*   width="100%" */}
                    {/* /> */}

                    <Box p="6">
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h3"
                        lineHeight="tight"
                        mb={1}
                      >
                        {project.name}
                      </Box>
                      <Box alignItems="baseline">
                        {project.topics.map((topic: string) => (
                          <Badge
                            key={`${project.id}-${topic}`}
                            borderRadius="full"
                            px="2"
                            mr={1}
                            mb={2}
                            color={badgeColor}
                          >
                            {topic}
                          </Badge>
                        ))}
                      </Box>
                      <Divider mt="1" mb="1" />
                      <Box>
                        <Text>{project.description}</Text>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
              </a>
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  ) : (
    <Container>
      <Text fontSize="xl" textAlign={'center'}>
        loading projects
      </Text>
    </Container>
  );
}
