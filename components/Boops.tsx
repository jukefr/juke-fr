import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
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
      <NextLink href={url} passHref scroll={false}>
        <Button
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
      </NextLink>
    </ListItem>
  );
};

const Boops = ({ boops }: any) => {
  const iconColor = useColorModeValue('purple', 'orange');
  return (
    <Box>
      <Heading mb={6} as="h2" size="md">
        boops
      </Heading>
      <List spacing={3}>
        {boops.map(({ id, date, title }: any) => (
          <AboutLink
            url={'/boops/' + id + '.html'}
            text={title}
            iconColor={iconColor}
            key={id}
          />
        ))}
      </List>
    </Box>
  );
};

export default Boops;
