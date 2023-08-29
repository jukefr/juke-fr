'use client';

import ToggleEditor from './togglers/ToggleEditor';
import ToggleJinx from './togglers/ToggleJinx';
import ToggleReducedMotion from './togglers/ToggleReducedMotion';
import ToggleColorMode from './togglers/ToggleColorMode';
import { NavLink } from './Links';
import { useState, useEffect } from 'react';
import { Clock } from 'three';
import {
  getFromLocalStorage,
  writeToLocalStorage,
  store as defaultStore,
} from '../app/store';
import getRandomShader from './assets/shaders';

const NavbarButtons = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <div className="contents">
      {store.getter.showJinx && (
        <div className="contents">
          <div>
            <ToggleEditor store={store} />
          </div>
          <div>
            <ToggleReducedMotion store={store} />
          </div>
        </div>
      )}
      <div>
        <ToggleJinx store={store} />
      </div>
      <div>
        <ToggleColorMode />
      </div>
    </div>
  );
};

const Navbar = ({}) => {
  const [storeGetter, storeSetter] = useState(defaultStore);

  const store = {
    getter: storeGetter,
    setter: (newstate: any) => {
      storeSetter(newstate);
    },
  };

  useEffect(() => {
    const hasUserSetReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const localStorage = getFromLocalStorage();

    let final = {
      ...defaultStore,
      showJinx: true, // only show the jinx client side
      prefersReducedMotion: hasUserSetReducedMotion,
      fragmentShader: getRandomShader(''),
      timer: new Clock(),
    };

    if (localStorage) {
      final = {
        ...final,
        ...localStorage,
      };
    }

    storeSetter(final);
  }, []);

  useEffect(() => {
    // so confused why this needs to be done
    if (storeGetter.fragmentShader !== '') {
      writeToLocalStorage(storeGetter);
    }
  }, [storeGetter]);
  return (
    <nav>
      <div className="flex mt-6 mb-12 align-bottom flex-wrap">
        <NavLink href="/">
          <h1>{'juke'}</h1>
        </NavLink>
        <NavLink href="/boops">boops</NavLink>
        <NavLink href="/about">about</NavLink>
        <div className="grow" />
        <NavbarButtons store={store} />
      </div>
    </nav>
  );
};

export default Navbar;
