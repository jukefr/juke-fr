import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';

const AboutLink = ({
  url,
  text,
  iconColor,
}: {
  url: string;
  text: string;
  iconColor: string;
}) => {
  return (
    <ListItem>
      <Button
        href={url}
        target="_blank"
        as="a"
        variant="ghost"
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          textAlign: 'left',
        }}
      >
        <ListIcon as={LinkIcon} color={iconColor} />
        {text}
      </Button>
    </ListItem>
  );
};

const AboutLinks = ({ iconColor }: { iconColor: string }) => {
  return (
    <Box>
      <Heading mb={6} as="h2" size="md">
        hypertext references
      </Heading>
      <List spacing={3}>
        <AboutLink
          url="https://code.juke.fr/kay"
          text="code is hosted on code.juke.fr"
          iconColor={iconColor}
        />

        <AboutLink
          url="https://matrix.to/#/@kay:juke.fr"
          text="chat via matrix at @kay:juke.fr"
          iconColor={iconColor}
        />
        <AboutLink
          url="mailto:site[at]juke[dot]fr?subject=Make sure to replace the [at] and [dot] in the email"
          text="email is site[at]juke[dot]fr"
          iconColor={iconColor}
        />
        <AboutLink
          url="https://ko-fi.com/kthnx/"
          text="donate on ko-fi"
          iconColor={iconColor}
        />
        <AboutLink
          url="https://liberapay.com/kthnx/"
          text="donate on liberapay"
          iconColor={iconColor}
        />
        <AboutLink
          url="https://paypal.me/kaythn/"
          text="donate on paypal"
          iconColor={iconColor}
        />
      </List>
    </Box>
  );
};

export default AboutLinks;
