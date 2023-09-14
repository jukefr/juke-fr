'use client';

import { useEffect, useState } from 'react';
import { NavLink } from './Links';
import ToggleColorMode from './togglers/ToggleColorMode';
import ToggleEditor from './togglers/ToggleEditor';
import ToggleJinx from './togglers/ToggleJinx';
import ToggleReducedMotion from './togglers/ToggleReducedMotion';

const NavbarButtons = () => {
  const [showJinx, setShowJinx] = useState('false');
  useEffect(() => {
    // ! handle localStorage changes from
    // ! - toggleJinx
    window.addEventListener('storage', () => {
      setShowJinx(localStorage.showJinx);
    });
    setShowJinx(localStorage.showJinx);
    return window.removeEventListener('storage', () => {});
  }, []);

  return (
    <div className="contents">
      {showJinx === 'true' && (
        <div className="contents">
          <div>
            <ToggleEditor />
          </div>
          <div>
            <ToggleReducedMotion />
          </div>
        </div>
      )}
      <div>
        <ToggleJinx />
      </div>
      <div>
        <ToggleColorMode />
      </div>
    </div>
  );
};

const Navbar = ({}) => {
  return (
    <nav>
      <div className="flex mt-6 mb-12 align-bottom flex-wrap">
        <NavLink href="/">
          <h1>{'juke'}</h1>
        </NavLink>
        <NavLink href="/boops">boops</NavLink>
        <NavLink href="/about">about</NavLink>
        <div className="grow" />
        <NavbarButtons />
      </div>
    </nav>
  );
};

export default Navbar;
