import { Container, Flex } from '@chakra-ui/react';
import AboutLinks from '../components/AboutLinks';

const AboutPage = (): JSX.Element => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      mb={12}
    >
      <Container>
        <AboutLinks />
      </Container>
    </Flex>
  );
};

export default AboutPage;
