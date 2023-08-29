import { LuPanelTopOpen, LuPanelTopClose } from 'react-icons/lu';
import { NavbarButton } from '../Links';

const ToggleEditor = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  const getIcon = (showEditor?: boolean) => {
    if (showEditor) {
      return <LuPanelTopClose />;
    }
    return <LuPanelTopOpen />;
  };

  return (
    <NavbarButton
      ariaLabel="Toggle Editor"
      onClick={() => {
        store.setter({
          ...store.getter,
          showEditor: !store.getter.showEditor,
        });
      }}
    >
      {getIcon(store.getter.showEditor)}
    </NavbarButton>
  );
};

export default ToggleEditor;
