'use client';

import { useState } from 'react';
import {
  getFromLocalStorage,
  writeToLocalStorage,
  store as defaultStore,
} from '../../app/store';
import Jinx from './Jinx';

export default function JinxWrapper({ fronter }: any) {
  const [storeGetter, storeSetter] = useState(defaultStore);

  const store = {
    getter: storeGetter,
    setter: (newstate: any) => {
      storeSetter(newstate);
    },
  };
  return (
    <>
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
                hello, it&apos;s <b>{fronter}</b> we do web development mainly
                (mostly, no clue what we&apos;re doing)
              </p>
            </div>
            <p className="mb-12">
              we&apos;re a <b>26 year-old trans 🏳️‍⚧️ non-binary borg system</b>.
              you can use any <b>neutral pronouns</b> for us (english: they or
              it, french: ielle/iel ou lae/lea ou ca/cela). currently lives near{' '}
              <b>paris</b>. likes anything that has to do with <b>technology</b>{' '}
              and hacking stuff (code, video, music, games, electronics, etc.).
              likes to share what we make and learn and teach stuff. very much
              pro <b>data rights</b> and more broadly against rising worldwide
              fascistic ideology and oppression.
            </p>
          </div>
        </div>
      )}
      {!store.getter.showJinx && (
        <div className="p-8 md:container md:mx-auto md:w-6/12 flex justify-center flex-col">
          <div className="flex flex-col bg-purple-200 px-6 py-4 mb-6 mt--6 w-full text-black rounded-sm">
            <p>
              hello, it&apos;s <b>{fronter}</b> we do web development mainly
              (mostly, no clue what we&apos;re doing)
            </p>
          </div>
        </div>
      )}
    </>
  );
}
