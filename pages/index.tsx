import { Flex, Heading } from '@chakra-ui/react';
import Projects from '../components/Projects';

interface IHomeProps {
  projects: any;
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

const HomePage = ({ projects }: IHomeProps): JSX.Element => {
  return (
    <Flex alignItems="center" justifyContent="center" direction="column">
      <Flex direction="column" rounded={6} mb={12}>
        <Heading mb={6} as="h2">
          random projects
        </Heading>
        <Projects projects={projects}></Projects>
      </Flex>
    </Flex>
  );
};

export default HomePage;
