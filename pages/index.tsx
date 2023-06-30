import {
  Flex,
  Heading,
  Text,
  Divider,
  Container,
  SimpleGrid,
  useColorModeValue,
  Box,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface IHomeProps {
  projects: any;
  store: any; // TODO: store type
}

export async function getStaticProps() {
  const latestURL = new URL('https://code.juke.fr/api/v1/users/kay/repos');
  latestURL.search = new URLSearchParams().toString();
  const projects = await (
    await fetch(latestURL.toString())
  )
    .json()
    .then((res) =>
      res.sort((a: any, b: any) => {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at);
      }),
    )
    // gitea is weird and doesnt seem to have a way to return tags without requesting the things
    // one by one so ehhhh
    .then(async (r) => {
      return Promise.all(
        r.map(async (project: any) => {
          const { topics } = await (
            await fetch(
              `https://code.juke.fr/api/v1/repos/kay/${project.name}/topics`,
            )
          ).json();
          return {
            ...project,
            topics,
          };
        }),
      );
    });

  return {
    props: {
      projects,
    },
    revalidate: 60 * 60,
  };
}

const HomePage = ({ projects, store }: IHomeProps): JSX.Element => {
  const badgeColor = useColorModeValue('purple', 'orange');
  const projectHoverBackground = useColorModeValue(
    'gray.100',
    'whiteAlpha.200',
  );
  return (
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
            {projects.map((project: any) => (
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
                        scale: store.getter.prefersReducedMotion ? 1 : 0,
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
  );
};

export default HomePage;
