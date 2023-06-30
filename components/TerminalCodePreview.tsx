import { useColorModeValue, Code, Box, Text } from '@chakra-ui/react';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-dracula.css';
import { useEffect } from 'react';

const getRandomColor = () => {
  const colors = ['gray.100', 'cyan', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const TerminalCodePreview = ({ children, lang }: any) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <Box bg={getRandomColor()} py={10} px={6} my={2}>
      <Box p={6} borderRadius={6} as="pre" boxShadow="dark-lg">
        <Code className={lang} display="block" whiteSpace="pre-wrap">
          {children}
        </Code>
      </Box>
    </Box>
  );
};

export default TerminalCodePreview;
