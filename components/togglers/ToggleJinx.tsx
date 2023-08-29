import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import { NavbarButton } from '../Links';

const ToggleJinx = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  const getIcon = (showEditor?: boolean) => {
    if (showEditor) {
      return <PiEyeClosedBold />;
    }
    return <PiEyeBold />;
  };
  return (
    <NavbarButton
      ariaLabel="Toggle Jinx and Intro"
      onClick={() => {
        store.setter({ ...store.getter, showJinx: !store.getter.showJinx });
      }}
    >
      {getIcon(store.getter.showJinx)}
    </NavbarButton>
  );
};

export default ToggleJinx;
