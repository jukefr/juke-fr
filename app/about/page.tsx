'use client';

import Link from '../../components/Link';

const AboutPage = (): JSX.Element => {
  return (
    <div className="flex align-center justify-center flex-col mb-12 md:container md:mx-auto">
      <h2 className="text-2xl font-bold">hypertext references</h2>
      <p className="text-xl">just some links that relate to us</p>
      <hr className="mb-6" />

      <ul className="space-y-3">
        <li>
          <Link href="https://code.juke.fr/kay" isExternal>
            code is hosted on code.juke.fr
          </Link>
        </li>
        <li>
          <Link href="https://matrix.to/#/@kay:juke.fr" isExternal>
            chat via matrix at @kay:juke.fr
          </Link>
        </li>
        <li>
          <Link href="mailto:site[at]juke[dot]fr?subject=Make sure to replace the [at] and [dot] in the email">
            email is site[at]juke[dot]fr
          </Link>
        </li>
        <li>
          <Link href="https://ko-fi.com/memoryleak/" isExternal>
            donate on ko-fi
          </Link>
        </li>
        <li>
          <Link href="https://liberapay.com/memoryleak/" isExternal>
            donate on liberapay
          </Link>
        </li>
        <li>
          <Link href="https://paypal.me/kaythn/" isExternal>
            donate on paypal
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
