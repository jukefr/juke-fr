import { A11yUserPreferences } from '@react-three/a11y';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Clock } from 'three';

import theme from '../components/chakraTheme';
import Layout from '../components/Layout';
import '../components/global.css';
import { useEffect, useState } from 'react';
import defaultStore from '../components/store';
import getRandomShader from '../components/assets/shaders';
import { dir } from 'console';

const writeToLocalStorage = ({ timer, ...state }: any) => {
  localStorage.setItem('state', JSON.stringify(state));
};

const getFromLocalStorage = () => {
  const localState = localStorage.getItem('state');
  if (localState) {
    return JSON.parse(localState);
  }
  return undefined;
};

export default function AppTemplate({
  Component,
  pageProps,
}: AppProps): JSX.Element {
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
    <ChakraProvider theme={theme}>
      <A11yUserPreferences>
        <Layout store={store}>
          <Component {...pageProps} store={store} />
        </Layout>
      </A11yUserPreferences>
    </ChakraProvider>
  );
}
