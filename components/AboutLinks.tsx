import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  Link,
  UnorderedList,
  Text,
  Divider,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const AboutLink = ({ url, text }: { url: string; text: string }) => {
  return (
    <ListItem>
      <Link href={url} isExternal>
        {text} <ExternalLinkIcon mx="2px" />
      </Link>
    </ListItem>
  );
};

const AboutLinks = ({ iconColor }: { iconColor: string }) => {
  return (
    <Box>
      <Heading as="h2">hypertext references</Heading>
      <Text fontSize="xl">just some links that relate to us</Text>
      <Divider mb={6} />

      <UnorderedList spacing={3}>
        <AboutLink
          url="https://code.juke.fr/kay"
          text="code is hosted on code.juke.fr"
        />

        <AboutLink
          url="https://matrix.to/#/@kay:juke.fr"
          text="chat via matrix at @kay:juke.fr"
        />
        <AboutLink
          url="mailto:site[at]juke[dot]fr?subject=Make sure to replace the [at] and [dot] in the email"
          text="email is site[at]juke[dot]fr"
        />
        <AboutLink url="https://ko-fi.com/kthnx/" text="donate on ko-fi" />
        <AboutLink
          url="https://liberapay.com/kthnx/"
          text="donate on liberapay"
        />
        <AboutLink url="https://paypal.me/kaythn/" text="donate on paypal" />
      </UnorderedList>
    </Box>
  );
};

export default AboutLinks;
