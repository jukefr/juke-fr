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
          <Button variant="ghost" mr={3} as="a">
            {' '}
            <Heading letterSpacing={'tighter'} size="md" as="h1">
              {'juke'}
            </Heading>
          </Button>
        </NextLink>
        <NextLink href="/about" passHref scroll={false}>
          <Button variant="ghost" as="a">
            <Text>about</Text>
          </Button>
        </NextLink>
        <NavbarButtons />
      </Flex>
    </nav>
  );
};

export default Navbar;
