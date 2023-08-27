'use client';

import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { NavbarButton } from '../Navbar';

export default function ToggleColorMode() {
  const [colorMode, setColorMode] = useState('light');
  const toggleColorMode = () => {
    colorMode === 'light' ? setColorMode('dark') : setColorMode('light');
  };
  useEffect(() => {
    // ! from https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
    localStorage.theme = colorMode;
    localStorage['chakra-ui-color-mode'] = colorMode; // ! for backward compatibility while porting
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  useEffect(() => {
    setColorMode(localStorage?.theme || 'light'); // ! populate on render not before not after
  }, []);

  return (
    <NavbarButton ariaLabel="Toggle Color Theme" onClick={toggleColorMode}>
      {colorMode === 'light' ? <LuMoon /> : <LuSun />}
    </NavbarButton>
  );
}
