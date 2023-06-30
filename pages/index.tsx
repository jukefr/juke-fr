import { Flex, Heading, Text, Divider, Container } from '@chakra-ui/react';
import Projects from '../components/Projects';

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
  return (
    <>
      <Container>
        <Heading as="h2">random projects</Heading>
        <Text fontSize="xl">
          i mean not so random, sorted by most recently worked on
        </Text>
        <Divider mb={6} />
      </Container>

      <Flex alignItems="center" justifyContent="center" direction="column">
        <Flex direction="column" rounded={6} mb={12}>
          <Projects projects={projects} store={store}></Projects>
        </Flex>
      </Flex>
    </>
  );
};

export default HomePage;
