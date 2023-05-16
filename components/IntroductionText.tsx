import { Flex, Text } from '@chakra-ui/react';
import { useAppSelector } from './store/hooks';
import { selectShowEditor } from './store/showEditor';

const IntroductionHeader = () => {
  return (
    <Text>
      hello, we&apos;re <b>kay</b>, a web developer (mostly, no clue what
      we&apos;re doing)
    </Text>
  );
};

const IntroductionBody = () => {
  return (
    <Text mb={12}>
      we&apos;re a <b>26 year-old trans 🏳️‍⚧️ non-binary borg system</b>. you can
      use any <b>neutral pronouns</b> for us (english: they or it, french:
      ielle/iel ou lae/lea ou ca/cela). currently lives near <b>paris</b>. likes
      anything that has to do with <b>technology</b> and hacking stuff (code,
      video, music, games, electronics, etc.). likes to share what we make and
      learn and teach stuff. very much pro <b>data rights</b> and more broadly
      against rising worldwide fascistic ideology and oppression.
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
