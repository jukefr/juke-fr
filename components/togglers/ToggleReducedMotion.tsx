'use client';

import { RiSlowDownFill, RiSpeedUpFill } from 'react-icons/ri';
import { NavbarButton } from '../Links';
import { useEffect, useState } from 'react';

function getIcon() {
  if (localStorage.prefersReducedMotion === 'true') {
    return <RiSlowDownFill />;
  }
  return <RiSpeedUpFill />;
}

const ToggleReducedMotion = () => {
  const [Icon, setIcon] = useState(<RiSpeedUpFill />);

  // ! handle localStorage changes from
  // ! - toggleReducedMotion
  useEffect(function handleStorageChance() {
    window.addEventListener('storage', () => {
      setIcon(getIcon());
    });
    setIcon(getIcon());
  }, []);

  return (
    <NavbarButton
      ariaLabel="Toggle Reduced Animations"
      onClick={() => {
        localStorage.prefersReducedMotion =
          localStorage.prefersReducedMotion === 'true' ? 'false' : 'true';
        window.dispatchEvent(new Event('storage'));
      }}
    >
      {Icon}
    </NavbarButton>
  );
};

export default ToggleReducedMotion;
