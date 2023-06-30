import { Container } from '@chakra-ui/react';
import IntroductionText from './IntroductionText';
import Jinx from './Jinx';

const Introduction = ({
  store,
}: {
  store: any; //TODO: store type
}) => {
  return (
    <Container maxW="container.md" centerContent>
      {store.getter.showJinx && (
        <div
          style={{
            minHeight: 420,
            width: '100%',
          }}
        >
          <Jinx store={store} />
        </div>
      )}

      <IntroductionText store={store} />
    </Container>
  );
};

export default Introduction;
