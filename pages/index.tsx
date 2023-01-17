import { Flex, Heading } from '@chakra-ui/react';
import Projects from '../components/Projects';

interface IHomeProps {
  projects: any;
}

export async function getStaticProps() {
  const latestURL = new URL('https://code.juke.fr/api/v1/users/kay/repos');
  const latestParams = {
    order_by: 'last_activity_at',
    per_page: '50',
  };
  latestURL.search = new URLSearchParams(latestParams).toString();
  const projects = await (await fetch(latestURL.toString())).json();

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
        <Heading mb={6} as="h2" size="md">
          Latest commits
        </Heading>
        <Projects projects={projects}></Projects>
      </Flex>
    </Flex>
  );
};

export default HomePage;
