import { Flex, Heading } from '@chakra-ui/react';
import Projects from '../components/Projects';
import { useState, useEffect } from 'react';

interface IHomeProps {
  projects: any;
}

const HomePage = (): JSX.Element => {
  const [projects, setProjects] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://code.juke.fr/api/v1/users/kay/repos')
      .then((res) => res.json())
      .then((res) =>
        res.sort((a: any, b: any) => {
          return Date.parse(b.updated_at) - Date.parse(a.updated_at);
        }),
      )
      .then((projects) => {
        setProjects(projects);
        setLoading(false);
      });
  }, []);
  if (isLoading) return <p>loading...</p>;
  if (!projects) return <p>error fetching projects :O</p>;
  return (
    <Flex alignItems="center" justifyContent="center" direction="column">
      <Flex direction="column" rounded={6} mb={12}>
        <Heading mb={6} as="h2" size="md">
          random projects
        </Heading>
        <Projects projects={projects}></Projects>
      </Flex>
    </Flex>
  );
};

export default HomePage;
