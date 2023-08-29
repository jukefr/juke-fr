'use client';

import { useEffect, useState } from 'react';
import { LuPanelTopClose, LuPanelTopOpen } from 'react-icons/lu';
import { NavbarButton } from '../Links';

function getIcon() {
  if (localStorage.showEditor === 'true') {
    return <LuPanelTopClose />;
  }
  return <LuPanelTopOpen />;
}

const ToggleEditor = () => {
  const [Icon, setIcon] = useState(<LuPanelTopOpen />);

  // ! handle localStorage changes from
  // ! - toggleEditor
  useEffect(function handleStorageChance() {
    window.addEventListener('storage', () => {
      setIcon(getIcon());
    });
    // ! default logic
    if (!('showEditor' in localStorage)) {
      localStorage.showEditor = 'false';
    }
    setIcon(getIcon());
    return window.removeEventListener('storage', () => {});
  }, []);

  return (
    <NavbarButton
      ariaLabel="Toggle Editor"
      onClick={() => {
        localStorage.showEditor =
          localStorage.showEditor === 'true' ? 'false' : 'true';
        window.dispatchEvent(new Event('storage'));
      }}
    >
      {Icon}
    </NavbarButton>
  );
};

export default ToggleEditor;
