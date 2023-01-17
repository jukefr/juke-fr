import { A11yUserPreferences } from '@react-three/a11y';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { AppWrapper } from '../components/AppWrapper';
import { draculaTheme } from '@kay/komponents';
import Layout from '../components/Layout';
import { store } from '../components/store/store';
import '../components/global.css';

export default function AppTemplate({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <AppWrapper>
      <Provider store={store}>
        <ChakraProvider theme={draculaTheme}>
          <A11yUserPreferences>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </A11yUserPreferences>
        </ChakraProvider>
      </Provider>
    </AppWrapper>
  );
}
