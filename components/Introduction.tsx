import { Container } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import IntroductionText from './IntroductionText';

const Introduction = () => {
  // we only want to render this component on the client (with webgl)
  const Jinx = dynamic(() => import('./Jinx'), {
    ssr: false,
  });

  return (
    <Container maxW="container.md" centerContent>
      <div
        style={{
          minHeight: 420,
          width: '100%',
        }}
      >
        <Jinx />
      </div>
      <IntroductionText />
    </Container>
  );
};

export default Introduction;
