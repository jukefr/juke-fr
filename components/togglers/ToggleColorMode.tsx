'use client';

import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { NavbarButton } from '../Links';

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
  const [colorMode, setColorMode] = useState('light');

  const toggleColorMode = () => {
    const newColor = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newColor);
    // ! from https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
    localStorage.theme = newColor;
    localStorage['chakra-ui-color-mode'] = newColor; // ! for backward compatibility while porting
  };
  useEffect(() => {
    addClassToDocument();
  }, [colorMode]);

  useEffect(() => {
    addClassToDocument();
  }, []);

  return (
    <NavbarButton ariaLabel="Toggle Color Theme" onClick={toggleColorMode}>
      {colorMode === 'light' ? <LuMoon /> : <LuSun />}
    </NavbarButton>
  );
}
