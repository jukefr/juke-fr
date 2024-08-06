'use client';

import { useEffect, useState } from 'react';
import { NavLink } from './Links';
import ToggleColorMode from './togglers/ToggleColorMode';
import ToggleEditor from './togglers/ToggleEditor';
import ToggleJinx from './togglers/ToggleJinx';
import ToggleReducedMotion from './togglers/ToggleReducedMotion';

const NavbarButtons = () => {
	const [showJinx, setShowJinx] = useState('false');
	useEffect(() => {
		// ! handle localStorage changes from
		// ! - toggleJinx
		window.addEventListener('storage', () => {
			setShowJinx(localStorage.showJinx);
		});
		setShowJinx(localStorage.showJinx);
		return window.removeEventListener('storage', () => { });
	}, []);

	return (
		<div className="contents">
			{showJinx === 'true' && (
				<div className="contents">
					<div>
						<ToggleEditor />
					</div>
					<div>
						<ToggleReducedMotion />
					</div>
				</div>
			)}
			<div>
				<ToggleJinx />
			</div>
			<div>
				<ToggleColorMode />
			</div>
		</div>
	);
};

const Navbar = ({ }) => {
	return (
		<nav>
			<div className="flex flex-wrap justify-between items-center mb-4 mt-4">
				<div className="flex flex-col md:flex-row md:items-center">
					<div className='mb-4 md:mb-0'>
						<NavLink href="/">
							<h1>juke</h1>
						</NavLink>
					</div>
					<div className='mb-4 md:mb-0'>
						<NavLink href="/boops">boops</NavLink>
					</div>
					<div className='mb-4 md:mb-0'>
						<NavLink href="/about">about</NavLink>
					</div>
				</div>
				<div className="grow" />
				<div className="flex flex-wrap w-full md:w-auto justify-end">
					<NavbarButtons />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
