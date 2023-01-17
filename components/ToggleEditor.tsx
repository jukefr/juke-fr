import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectPrefersReducedMotion } from './store/prefersReducedMotion';
import { selectShowEditor, toggleEditor } from './store/showEditor';

const getIcon = (showEditor?: boolean) => {
  if (showEditor) {
    return <CloseIcon />;
  }
  return <EditIcon />;
};

const getColor = (showEditor?: boolean) => {
  if (showEditor) {
    return 'red';
  }
  return useColorModeValue('blue', 'green');
};

const ToggleEditor = () => {
  const showEditor = useAppSelector(selectShowEditor);
  const prefersReducedMotion = useAppSelector(selectPrefersReducedMotion);
  const dispatch = useAppDispatch();

  return (
    <AnimatePresence exitBeforeEnter initial={false} key={'editorToggleBtn'}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={`editor-toggle-${showEditor}`}
        initial={{ y: prefersReducedMotion ? 0 : -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: prefersReducedMotion ? 0 : 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle Editor"
          colorScheme={getColor(showEditor)}
          icon={getIcon(showEditor)}
          onClick={() => dispatch(toggleEditor())}
          mr={3}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToggleEditor;
