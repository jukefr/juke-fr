import { Flex, Text } from '@chakra-ui/react';
import { useAppSelector } from './store/hooks';
import { selectShowEditor } from './store/showEditor';

const IntroductionHeader = () => {
  return (
    <Text>
      hello, i&apos;m <b>k</b>, a backend web developer (mostly, i have no clue
      what i&apos;m doing)
    </Text>
  );
};

const IntroductionBody = () => {
  return (
    <Text mb={12}>
      <b>kay</b> is a <b>25 year-old non-binary/agender robo</b>. you can use
      any <b>neutral pronouns</b> for them (english: they or it, french:
      ielle/iel ou lae/lea ou ca/cela). it currently lives and works near{' '}
      <b>paris</b>. they like anything that has to do with <b>technology</b> and
      hacking stuff (code, video, music, etc.). it creates mostly ephemeral,
      always <b>open source</b> pet projects. they are very much pro{' '}
      <b>data rights</b> and against rising worldwide fascistic ideology and
      oppression.
    </Text>
  );
};

const IntroductionText = () => {
  const showEditor = useAppSelector(selectShowEditor);
  return (
    <>
      <Flex
        direction="column"
        background={'purple.200'}
        px={6}
        py={4}
        rounded={6}
        roundedTop={showEditor ? 0 : 6}
        mb={6}
        mt={-6}
        w="100%"
        color="#2b2e3b"
      >
        <IntroductionHeader />
      </Flex>
      <IntroductionBody />
    </>
  );
};

export default IntroductionText;
