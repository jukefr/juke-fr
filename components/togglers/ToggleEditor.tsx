'use client';

import { LuPanelTopOpen, LuPanelTopClose } from 'react-icons/lu';
import { NavbarButton } from '../Links';
import { useState, useEffect } from 'react';

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
    setIcon(getIcon());
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
