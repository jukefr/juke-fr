import NextLink from 'next/link';
import ToggleEditor from './togglers/ToggleEditor';
import ToggleJinx from './togglers/ToggleJinx';
import ToggleReducedMotion from './togglers/ToggleReducedMotion';
import ToggleColorMode from './togglers/ToggleColorMode';

export const NavbarButton = ({ ariaLabel, onClick, children }: any) => (
  <button
    aria-label={ariaLabel}
    className={`p-3 ml-3 rounded-sm ring-2
      hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-600 hover:to-purple-800
      active:bg-gradient-to-r active:from-blue-600 active:via-purple-700 active:to-purple-900
    text-black dark:text-white ring-black dark:ring-white hover:text-white active:text-white`}
    onClick={onClick}
  >
    {children}
  </button>
);

const NavbarButtons = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <div className="contents">
      {store.getter.showJinx && (
        <div className="contents">
          <div>
            <ToggleEditor store={store} />
          </div>
          <div>
            <ToggleReducedMotion store={store} />
          </div>
        </div>
      )}
      <div>
        <ToggleJinx store={store} />
      </div>
      <div>
        <ToggleColorMode />
      </div>
    </div>
  );
};

const NavLink = ({ href, children }: any) => (
  <NextLink href={href} passHref scroll={false}>
    <button
      className="flex mr-3 font-semibold rounded-sm ring-2 px-6 py-2 active:underline
        hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-600 hover:to-purple-800
        active:bg-gradient-to-r active:from-blue-600 active:via-purple-700 active:to-purple-900
      text-black dark:text-white ring-black dark:ring-white hover:text-white active:text-white"
    >
      {children}
    </button>
  </NextLink>
);

const Navbar = ({
  store,
}: {
  store: any; // TODO: store type
}) => {
  return (
    <nav>
      <div className="flex mt-6 mb-12 align-bottom flex-wrap">
        <NavLink href="/">
          <h1>{'juke'}</h1>
        </NavLink>
        <NavLink href="/boops">boops</NavLink>
        <NavLink href="/about">about</NavLink>
        <div className="grow" />
        <NavbarButtons store={store} />
      </div>
    </nav>
  );
};

export default Navbar;
