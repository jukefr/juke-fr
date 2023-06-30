import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { LuSun, LuMoon } from 'react-icons/lu';

export default function ToggleColorMode() {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle Color Theme"
      colorScheme={useColorModeValue('gray', 'orange')}
      icon={useColorModeValue(<LuMoon />, <LuSun />)}
      onClick={toggleColorMode}
    ></IconButton>
  );
}
