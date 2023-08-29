import Link from '../../components/Links';

import {
  title as scrTitle,
  id as scrId,
} from './natural-screen-reader-voice-on-linux/meta';
// } from './boops/better-privacy-when-browsing-online.html';
// } from './boops/in-place-encryption-raspberry-pi-yunohost.html';

const BoopsPage = (): JSX.Element => {
  return (
    <div className="flex align-center justify-center flex-col mb-12 md:container md:mx-auto">
      <h2 className="text-2xl font-bold">boops</h2>
      <p className="text-xl">
        these are just blog posts but with a silly name because i&apos;m quirky
        like that
      </p>
      <hr className="mb-6" />
      <ul className="space-y-3 list-disc">
        <li key={scrId}>
          <Link href={`/boops/${scrId}`}>{scrTitle}</Link>
        </li>
      </ul>
    </div>
  );
};

export default BoopsPage;
