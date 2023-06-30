import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';
const TerminalCodePreview = ({ element }: { element: HTMLElement }) => {
  return (
    <SimpleGrid
      columns={[1, null, 3]}
      spacing={10}
      templateRows="masonry" // won't work until 2050 or something
    ></SimpleGrid>
  );
};

export default TerminalCodePreview;
