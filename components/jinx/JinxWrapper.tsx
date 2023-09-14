'use client';

import { useEffect, useState } from 'react';
import Jinx from './JinxCanvas';

export default function JinxWrapper({ fronter }: { fronter: string }) {
  const [showJinx, setShowJinx] = useState('true');
  const [showEditor, setShowEditor] = useState('false');

  useEffect(() => {
    // ! handle localStorage changes from
    // ! - toggleJinx
    // ! - toggleEditor
    window.addEventListener('storage', () => {
      setShowJinx(localStorage.showJinx);
      setShowEditor(localStorage.showEditor);
    });
    setShowJinx(localStorage.showJinx);
    setShowEditor(localStorage.showEditor);
    return window.removeEventListener('storage', () => {});
  }, []);

  return (
    <>
      {showJinx === 'true' && (
        <div className="p-8 md:container md:mx-auto md:w-6/12 flex justify-center flex-col">
          <div className="min-h-[420px] w-full">
            <Jinx />
          </div>
          <div>
            <div
              className={`flex flex-col px-6 py-4 mb-6 mt--6 w-full text-white rounded-sm ${
                showEditor === 'true' && showJinx === 'true'
                  ? 'rounded-t-0'
                  : 'rounded-t-sm'
              }
              bg-gradient-to-r from-indigo-500 via-purple-600 to-purple-800 shadow-lg`}
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
      {showJinx === 'false' && (
        <div className="p-8 md:container md:mx-auto md:w-6/12 flex justify-center flex-col">
          <div
            className="flex flex-col px-6 py-4 mb-6 mt--6 w-full text-white rounded-sm
          bg-gradient-to-r from-indigo-500 via-purple-600 to-purple-800"
          >
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
