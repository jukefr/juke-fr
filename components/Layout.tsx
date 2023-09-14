'use client';

import { A11yUserPreferences } from '@react-three/a11y'; // ! requires use client
import Navbar from './Navbar';
import JinxWrapper from './jinx/JinxWrapper';

export default function Layout({ fronter }: { fronter: string }) {
  return (
    <A11yUserPreferences>
      <div className="px-4 md:container md:mx-auto">
        <Navbar />
      </div>
      <main>
        <JinxWrapper fronter={fronter} />
      </main>
    </A11yUserPreferences>
  );
}
