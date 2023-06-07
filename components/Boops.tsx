import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
  Link,
  UnorderedList,
  Text,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';

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
      <Link as={NextLink} href={url} passHref scroll={false}>
        {text}
      </Link>
    </ListItem>
  );
};

const Boops = ({ boops }: any) => {
  const iconColor = useColorModeValue('purple', 'orange');
  return (
    <Box>
      <Heading as="h2">boops</Heading>
      <Text fontSize="xl">
        these are just blog posts but with a silly name because i&apos;m quirky
        like that
      </Text>
      <Divider mb={6} />

      <UnorderedList spacing={3}>
        {boops.map(({ id, date, title }: any) => (
          <AboutLink
            url={'/boops/' + id + '.html'}
            text={title}
            iconColor={iconColor}
            key={id}
          />
        ))}
      </UnorderedList>
    </Box>
  );
};

export default Boops;
