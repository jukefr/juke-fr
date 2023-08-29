'use client';

import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import { NavbarButton } from '../Links';
import { useState, useEffect } from 'react';

function getIcon() {
  if (localStorage.showJinx === 'true') {
    return <PiEyeClosedBold />;
  }
  return <PiEyeBold />;
}

const ToggleJinx = () => {
  const [Icon, setIcon] = useState(<PiEyeBold />);

  useEffect(function handleStorageChance() {
    // ! handle localStorage changes from
    // ! - toggleJinx
    window.addEventListener('storage', () => {
      setIcon(getIcon());
    });
    // ! default logic
    if (!('showJinx' in localStorage)) {
      localStorage.showJinx = 'true';
    }
    setIcon(getIcon());
    return window.removeEventListener('storage', () => {});
  }, []);

  return (
    <NavbarButton
      ariaLabel="Toggle Jinx and Intro"
      onClick={() => {
        localStorage.showJinx =
          localStorage.showJinx === 'true' ? 'false' : 'true';
        window.dispatchEvent(new Event('storage'));
      }}
    >
      {Icon}
    </NavbarButton>
  );
};

export default ToggleJinx;
