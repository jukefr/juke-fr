import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import ToggleEditor from './ToggleEditor';
import ToggleJinx from './ToggleJinx';
import ToggleReducedMotion from './ToggleReducedMotion';
import ToggleColorMode from './ToggleColorMode';

const NavbarButtons = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <>
      <Spacer></Spacer>
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
      <Box mr={3}>
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
      <Flex mt={6} mb={12} alignItems="bottom">
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
        <NavbarButtons store={store} />
      </Flex>
    </nav>
  );
};

export default Navbar;
