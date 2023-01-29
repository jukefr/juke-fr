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
        <NextLink href="/" passHref scroll={false}>
          <Button variant="ghost" mr={3}>
            {' '}
            <Heading letterSpacing={'tighter'} size="md" as="h1">
              {'juke'}
            </Heading>
          </Button>
        </NextLink>
        <NextLink href="/boops.html" passHref scroll={false}>
          <Button variant="ghost">
            <Text>boops</Text>
          </Button>
        </NextLink>
        <NextLink href="/about.html" passHref scroll={false}>
          <Button variant="ghost">
            <Text>about</Text>
          </Button>
        </NextLink>
        <NavbarButtons />
      </Flex>
    </nav>
  );
};

export default Navbar;
