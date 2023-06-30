import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { LuPanelTopOpen, LuPanelTopClose } from 'react-icons/lu';

const getIcon = (showEditor?: boolean) => {
  if (showEditor) {
    return <LuPanelTopClose />;
  }
  return <LuPanelTopOpen />;
};

const getColor = (showEditor?: boolean) => {
  if (showEditor) {
    return useColorModeValue('blue', 'green');
  }
  return 'red';
};

const ToggleEditor = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <IconButton
      aria-label="Toggle Editor"
      colorScheme={getColor(store.getter.showEditor)}
      icon={getIcon(store.getter.showEditor)}
      onClick={() => {
        store.setter({
          ...store.getter,
          showEditor: !store.getter.showEditor,
        });
      }}
      mr={3}
    ></IconButton>
  );
};

export default ToggleEditor;
