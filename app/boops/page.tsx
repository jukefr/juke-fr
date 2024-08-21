import Link from '../../components/Links';

import {
  title as screenReaderTitle,
  id as screenReaderId,
} from './natural-screen-reader-voice-on-linux/meta';
import {
  title as headscaleTitle,
  id as headscaleId,
} from './headscale-on-nixos/meta'
// } from './boops/better-privacy-when-browsing-online.html';
// } from './boops/in-place-encryption-raspberry-pi-yunohost.html';

const BoopsPage = (): JSX.Element => {
  return (
    <div className="flex align-center justify-center flex-col mb-12 px-4 md:container md:mx-auto">
      <h2 className="text-2xl font-bold">boops</h2>
      <p className="text-xl">
        these are just blog posts but with a silly name because i&apos;m quirky
        like that
      </p>
      <hr className="mb-6" />
      <ul className="space-y-3 list-disc">
        <li key={screenReaderId}>
          <Link href={`/boops/${screenReaderId}`}>{screenReaderTitle}</Link>
        </li>
        <li key={headscaleId}>
          <Link href={`/boops/${headscaleId}`}>{headscaleTitle}</Link>
        </li>
      </ul>
    </div>
  );
};

export default BoopsPage;
