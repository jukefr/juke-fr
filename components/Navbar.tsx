import ToggleEditor from './togglers/ToggleEditor';
import ToggleJinx from './togglers/ToggleJinx';
import ToggleReducedMotion from './togglers/ToggleReducedMotion';
import ToggleColorMode from './togglers/ToggleColorMode';
import { NavLink } from './Links';

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
