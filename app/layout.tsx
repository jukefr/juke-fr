'use client';

import { A11yUserPreferences } from '@react-three/a11y';
import { useEffect, useState } from 'react';
import { Clock } from 'three';
import Navbar from '../components/Navbar';
import getRandomShader from '../components/assets/shaders';
import '../components/global.css';
import Jinx from '../components/jinx/Jinx';
import './globals.css';
import {
  store as defaultStore,
  getFromLocalStorage,
  writeToLocalStorage,
} from './store';

// export const metadata: Metadata = {
//   title: 'My Page Title',
// };

export default function Layout({
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
      <body className="bg-light-50 dark:bg-darker-900 text-darker-900 dark:text-light-50">
        {/* <Head>
          <title>juke.fr</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="creates mostly ephemeral, always open source pet projects, sometimes."
            key="meta-description"
          />
          <meta
            name="keywords"
            content="Javascript, Node, Typescript, React, Next.js, Docker"
            key="meta-keywords"
          />
          <meta name="author" content="Kay" key="meta-author" />

          <meta property="og:title" content="juke.fr" key="meta-og-title" />
          <meta
            property="og:description"
            content="creates mostly ephemeral, always open source pet projects, sometimes."
            key="meta-og-description"
          />
          <meta
            property="og:image"
            content="https://juke.fr/og.png"
            key="meta-og-image"
          />
          <meta property="og:type" content="website" key="meta-og-type" />
          <meta
            property="og:site_name"
            content="juke.fr"
            key="meta-og-site_name"
          />
          <meta property="og:locale" content="en_US" key="meta-og-locale" />

          <meta name="twitter:card" content="summary" key="meta-twitter-card" />
          <meta name="twitter:site" content="@jukefr" key="meta-twitter-site" />
          <meta
            name="twitter:creator"
            content="@jukefr"
            key="meta-twitter-creator"
          />
          <meta
            name="twitter:title"
            content="juke.fr"
            key="meta-twitter-title"
          />
          <meta
            name="twitter:description"
            content="creates mostly ephemeral, always open source pet projects, sometimes."
            key="meta-twitter-description"
          />
          <meta
            name="twitter:image"
            content="https://juke.fr/og.png"
            key="meta-twitter-image"
          />
        </Head> */}
        <A11yUserPreferences>
          <div className="md:container md:mx-auto">
            <Navbar store={store} />
          </div>
          <main>
            {store.getter.showJinx && (
              <div className="p-8 md:container md:mx-auto md:w-6/12 flex justify-center flex-col">
                <div className="min-h-[420px] w-full">
                  <Jinx store={store} />
                </div>
                <div>
                  <div
                    className={`flex flex-col bg-purple-200 px-6 py-4 mb-6 mt--6 w-full text-black rounded-sm ${
                      store.getter.showEditor && store.getter.showJinx
                        ? 'rounded-t-0'
                        : 'rounded-t-sm'
                    }`}
                  >
                    <p>
                      hello, it&apos;s <b>{fronter}</b> we do web development
                      mainly (mostly, no clue what we&apos;re doing)
                    </p>
                  </div>
                  <p className="mb-12">
                    we&apos;re a{' '}
                    <b>26 year-old trans 🏳️‍⚧️ non-binary borg system</b>. you can
                    use any <b>neutral pronouns</b> for us (english: they or it,
                    french: ielle/iel ou lae/lea ou ca/cela). currently lives
                    near <b>paris</b>. likes anything that has to do with{' '}
                    <b>technology</b> and hacking stuff (code, video, music,
                    games, electronics, etc.). likes to share what we make and
                    learn and teach stuff. very much pro <b>data rights</b> and
                    more broadly against rising worldwide fascistic ideology and
                    oppression.
                  </p>
                </div>
              </div>
            )}
            {!store.getter.showJinx && (
              <div className="p-8 md:container md:mx-auto md:w-6/12 flex justify-center flex-col">
                <div className="flex flex-col bg-purple-200 px-6 py-4 mb-6 mt--6 w-full text-black rounded-sm">
                  <p>
                    hello, it&apos;s <b>{fronter}</b> we do web development
                    mainly (mostly, no clue what we&apos;re doing)
                  </p>
                </div>
              </div>
            )}
            {children}
          </main>
        </A11yUserPreferences>
      </body>
    </html>
  );
}
