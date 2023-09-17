import Link from '../../components/Links';

const AboutPage = (): JSX.Element => {
  return (
    <div className="flex align-center justify-center flex-col mb-12 px-4 md:container md:mx-auto">
      <h2 className="text-2xl font-bold">hypertext references</h2>
      <p className="text-xl">just some links that relate to us</p>
      <hr className="mb-6" />

      <ul className="space-y-3 list-disc">
        <li>
          <Link href="https://codeberg.org/juke" isExternal>
            code is hosted on codeberg.org/juke
          </Link>
        </li>
        <li>
          <Link href="https://matrix.to/#/@jukefr:matrix.org" isExternal>
            chat via matrix at @kay:matrix.org
          </Link>
        </li>
        <li>
          <Link
            href="mailto:site[at]juke[dot]fr?subject=Make sure to replace the [at] and [dot] in the email"
            isExternal
          >
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
