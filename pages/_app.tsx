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
    storeSetter({
      // initialize making sure server and client state match
      // (for dev reasons mainly but also allows for SSR in the future if needed)
      ...storeGetter,
      prefersReducedMotion: hasUserSetReducedMotion,
      fragmentShader: getRandomShader(''),
      timer: new Clock(),
    });
  }, []);

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
