'use client';

import { useEffect, useState } from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';

export default function ToggleColorMode() {
  const [colorMode, setColorMode] = useState(localStorage?.theme || 'light');
  const toggleColorMode = () => {
    colorMode === 'light' ? setColorMode('dark') : setColorMode('light');
  };
  useEffect(() => {
    // ! from https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
    localStorage.theme = colorMode;
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

  return (
    <button
      aria-label="Toggle Color Theme"
      className={`text-black p-3 rounded-lg
        bg-gray-200 hover:bg-gray-300 active:bg-gray-400
        dark:bg-orange-400 dark:hover:bg-orange-500 dark:active:bg-orange-600`}
      onClick={toggleColorMode}
    >
      {colorMode === 'light' ? <LuMoon /> : <LuSun />}
    </button>
  );
}
