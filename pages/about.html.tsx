import {
  Container,
  Flex,
  Box,
  Heading,
  ListItem,
  Link,
  UnorderedList,
  Text,
  Divider,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const AboutPage = (): JSX.Element => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      mb={12}
    >
      <Container>
        <Box>
          <Heading as="h2" size="xl">
            hypertext references
          </Heading>
          <Text fontSize="xl">just some links that relate to us</Text>
          <Divider mb={6} />

          <UnorderedList spacing={3}>
            <ListItem>
              <Link href="https://code.juke.fr/kay" isExternal>
                code is hosted on code.juke.fr <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>

            <ListItem>
              <Link href="https://matrix.to/#/@kay:juke.fr" isExternal>
                chat via matrix at @kay:juke.fr <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="mailto:site[at]juke[dot]fr?subject=Make sure to replace the [at] and [dot] in the email"
                isExternal
              >
                email is site[at]juke[dot]fr <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://ko-fi.com/kthnx/" isExternal>
                donate on ko-fi <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://liberapay.com/kthnx/" isExternal>
                donate on liberapay <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://paypal.me/kaythn/" isExternal>
                donate on paypal <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </Container>
    </Flex>
  );
};

export default AboutPage;
