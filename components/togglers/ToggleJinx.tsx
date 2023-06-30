import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

const getIcon = (showEditor?: boolean) => {
  if (showEditor) {
    return <PiEyeClosedBold />;
  }
  return <PiEyeBold />;
};

const getColor = (showEditor?: boolean) => {
  if (showEditor) {
    return useColorModeValue('blue', 'green');
  }
  return 'red';
};

const ToggleJinx = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <IconButton
      aria-label="Toggle Jinx and Intro"
      colorScheme={getColor(store.getter.showJinx)}
      icon={getIcon(store.getter.showJinx)}
      onClick={() => {
        store.setter({ ...store.getter, showJinx: !store.getter.showJinx });
      }}
      mr={3}
    ></IconButton>
  );
};

export default ToggleJinx;
