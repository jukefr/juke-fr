'use client';

import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { NavbarButton } from '../Links';

function getIcon() {
  if (localStorage.theme === 'light') {
    return <LuMoon />;
  }
  return <LuSun />;
}

function addClassToDocument() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export default function ToggleColorMode() {
  const [Icon, setIcon] = useState(<LuMoon />);

  // ! handle localStorage changes from
  // ! - toggleColorMode
  useEffect(function handleStorageChance() {
    window.addEventListener('storage', () => {
      setIcon(getIcon());
      addClassToDocument();
    });
    setIcon(getIcon());
    addClassToDocument();
    return window.removeEventListener('storage', () => {});
  }, []);

  return (
    <NavbarButton
      ariaLabel="Toggle Color Theme"
      onClick={() => {
        localStorage.theme = localStorage.theme === 'light' ? 'dark' : 'light';
        window.dispatchEvent(new Event('storage'));
      }}
    >
      {Icon}
    </NavbarButton>
  );
}
