'use client';

import { useEffect, useState } from 'react';
import { RiSlowDownFill, RiSpeedUpFill } from 'react-icons/ri';
import { NavbarButton } from '../Links';

function getIcon() {
  if (localStorage.prefersReducedMotion === 'false') {
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
    // ! default logic
    if (!('prefersReducedMotion' in localStorage)) {
      localStorage.prefersReducedMotion = 'true';
    }
    setIcon(getIcon());
    return window.removeEventListener('storage', () => {});
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
