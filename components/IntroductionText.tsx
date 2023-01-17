import { Flex, Text } from '@chakra-ui/react';
import { useAppSelector } from './store/hooks';
import { selectShowEditor } from './store/showEditor';

const IntroductionHeader = () => {
  return (
    <Text>
      Henlo, I&apos;m <b>k</b>, a backend web developer (mostly, i have no clue
      what i&apos;m doing)
    </Text>
  );
};

const IntroductionBody = () => {
  return (
    <Text mb={12}>
      <b>Kay</b> is a <b>25 year-old non-binary/agender robo</b>. You can use any{' '}
      <b>neutral pronouns</b> for them (english: they or it, french: ielle/iel ou
      lae/lea ou ca/cela). It currently lives and works near <b>Paris</b>. They like anything
      that has to do with <b>technology</b> and hacking stuff (code, video,
      music, etc.). It creates mostly ephemeral, always <b>open source</b> pet
      projects. They are very much pro <b>data rights</b> and against rising
      worldwide fascistic ideology and oppression.
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
