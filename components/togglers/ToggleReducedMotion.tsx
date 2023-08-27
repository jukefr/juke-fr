import { RiSlowDownFill, RiSpeedUpFill } from 'react-icons/ri';
import { NavbarButton } from '../Navbar';

const ToggleReducedMotion = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  const getIcon = (prefersReducedMotion?: boolean) => {
    if (prefersReducedMotion) {
      return <RiSlowDownFill />;
    }
    return <RiSpeedUpFill />;
  };

  return (
    <NavbarButton
      ariaLabel="Toggle Reduced Animations"
      onClick={() => {
        store.setter({
          ...store.getter,
          prefersReducedMotion: !store.getter.prefersReducedMotion,
        });
      }}
    >
      {getIcon(!store.getter.prefersReducedMotion)}
    </NavbarButton>
  );
};

export default ToggleReducedMotion;
