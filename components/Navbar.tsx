import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import ToggleEditor from './togglers/ToggleEditor';
import ToggleJinx from './togglers/ToggleJinx';
import ToggleReducedMotion from './togglers/ToggleReducedMotion';
import ToggleColorMode from './togglers/ToggleColorMode';

const NavbarButtons = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <>
      {store.getter.showJinx && (
        <>
          <Box>
            <ToggleEditor store={store} />
          </Box>
          <Box>
            <ToggleReducedMotion store={store} />
          </Box>
        </>
      )}
      <Box>
        <ToggleJinx store={store} />
      </Box>
      <Box mr={3} alignSelf="flex-end">
        <ToggleColorMode />
      </Box>
    </>
  );
};

const Navbar = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <nav>
      <Flex mt={6} mb={12} alignItems="bottom" wrap="wrap">
        <Button
          variant="ghost"
          mr={3}
          as={NextLink}
          href="/"
          passHref
          scroll={false}
        >
          {' '}
          <Heading letterSpacing={'tighter'} size="md" as="h1">
            {'juke'}
          </Heading>
        </Button>
        <Button
          variant="ghost"
          as={NextLink}
          href="/boops.html"
          passHref
          scroll={false}
        >
          <Text>boops</Text>
        </Button>
        <Button
          variant="ghost"
          as={NextLink}
          href="/about.html"
          passHref
          scroll={false}
        >
          <Text>about</Text>
        </Button>
        <Spacer />
        <NavbarButtons store={store} />
      </Flex>
    </nav>
  );
};

export default Navbar;
