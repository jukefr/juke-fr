import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { RiSlowDownFill, RiSpeedUpFill } from 'react-icons/ri';

const getIcon = (prefersReducedMotion?: boolean) => {
  if (prefersReducedMotion) {
    return <RiSlowDownFill />;
  }
  return <RiSpeedUpFill />;
};

const getColor = (prefersReducedMotion?: boolean) => {
  if (prefersReducedMotion) {
    return useColorModeValue('blue', 'green');
  }
  return 'orange';
};

const ToggleReducedMotion = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <IconButton
      aria-label="Toggle Reduced Animations"
      colorScheme={getColor(store.getter.prefersReducedMotion)}
      icon={getIcon(store.getter.prefersReducedMotion)}
      onClick={() => {
        store.setter({
          ...store.getter,
          prefersReducedMotion: !store.getter.prefersReducedMotion,
        });
      }}
      mr={3}
    ></IconButton>
  );
};

export default ToggleReducedMotion;
