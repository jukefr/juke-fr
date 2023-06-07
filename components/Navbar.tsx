import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import ToggleEditor from './ToggleEditor';
import { ColorModeToggle } from '@kay/komponents';

const NavbarButtons = () => {
  return (
    <>
      <Spacer></Spacer>
      <Box>
        <ToggleEditor />
      </Box>
      <Box>
        <ColorModeToggle />
      </Box>
    </>
  );
};

const Navbar = () => {
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
        <NavbarButtons />
      </Flex>
    </nav>
  );
};

export default Navbar;
