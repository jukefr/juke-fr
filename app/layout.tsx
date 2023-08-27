'use client';

import {
  ChakraProvider,
  ColorModeScript,
  Container,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Jinx from '../components/jinx/Jinx';
import {
  store as defaultStore,
  getFromLocalStorage,
  writeToLocalStorage,
} from './store';
import { Clock } from 'three';
import getRandomShader from '../components/assets/shaders';
import { A11yUserPreferences } from '@react-three/a11y';
import theme from '../components/assets/chakraTheme';

import '../components/global.css';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // Store Stuff
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

  // Fronter Stuff
  const [fronter, setFronter] = useState('kay');
  useEffect(() => {
    fetch('/api/fronters')
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .then((res) =>
        setFronter(
          //       res.members[0].name
          res.members.reduce(
            (acc: string, val: any) => `${val.name} (${val.pronouns}), ${acc}`,
            '',
          ),
        ),
      );
  }, []);

  return (
    <html>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <A11yUserPreferences>
            <Container maxW="container.lg">
              <Navbar store={store} />
            </Container>
            <main>
              {store.getter.showJinx && (
                <Container
                  maxW="container.md"
                  centerContent
                  padding={8}
                  overflowX="hidden"
                >
                  <div
                    style={{
                      minHeight: 420,
                      width: '100%',
                    }}
                  >
                    <Jinx store={store} />
                  </div>

                  <>
                    <Flex
                      direction="column"
                      background={'purple.200'}
                      px={6}
                      py={4}
                      rounded={6}
                      roundedTop={
                        store.getter.showEditor && store.getter.showJinx ? 0 : 6
                      }
                      mb={6}
                      mt={-6}
                      w="100%"
                      color="#2b2e3b"
                    >
                      <Text>
                        hello, it&apos;s <b>{fronter}</b> web development mainly
                        (mostly, no clue what we&apos;re doing)
                      </Text>
                    </Flex>
                    <Text mb={12}>
                      we&apos;re a{' '}
                      <b>26 year-old trans 🏳️‍⚧️ non-binary borg system</b>. you
                      can use any <b>neutral pronouns</b> for us (english: they
                      or it, french: ielle/iel ou lae/lea ou ca/cela). currently
                      lives near <b>paris</b>. likes anything that has to do
                      with <b>technology</b> and hacking stuff (code, video,
                      music, games, electronics, etc.). likes to share what we
                      make and learn and teach stuff. very much pro{' '}
                      <b>data rights</b> and more broadly against rising
                      worldwide fascistic ideology and oppression.
                    </Text>
                  </>
                </Container>
              )}
              {!store.getter.showJinx && (
                <Container
                  maxW="container.md"
                  centerContent
                  padding={8}
                  overflowX="hidden"
                >
                  <Flex
                    direction="column"
                    background={'purple.200'}
                    px={6}
                    py={4}
                    rounded={6}
                    roundedTop={6}
                    mb={6}
                    mt={-6}
                    w="100%"
                    color="#2b2e3b"
                  >
                    <Text>
                      hello, it&apos;s <b>{fronter}</b> web development mainly
                      (mostly, no clue what we&apos;re doing)
                    </Text>
                  </Flex>
                </Container>
              )}
              {children}
            </main>
          </A11yUserPreferences>
        </ChakraProvider>
      </body>
    </html>
  );
}
