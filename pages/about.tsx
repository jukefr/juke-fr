import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import AboutCapitalisms from '../components/AboutCapitalisms';
import AboutLinks from '../components/AboutLinks';

const AboutPage = (): JSX.Element => {
  const iconColor = useColorModeValue('purple', 'orange');
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      mb={12}
    >
      <Container>
        <AboutCapitalisms />
        <AboutLinks iconColor={iconColor} />
      </Container>
    </Flex>
  );
};

export default AboutPage;
