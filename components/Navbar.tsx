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
			<div className='mb-4 order-1 md:order-4'>
				<ToggleColorMode />
			</div>
			<div className='mb-4 order-2 md:order-3'>
				<ToggleJinx />
			</div>
			{showJinx === 'true' && (
				<>
					<div className='mb-4 order-3 md:order-1'>
						<ToggleEditor />
					</div>
					<div className='mb-4 order-4 md:order-2'>
						<ToggleReducedMotion />
					</div>
				</>
			)}

		</div>
	);
};

const Navbar = ({ }) => {
	return (
		<nav>
			<div className="flex flex-row justify-between items-start md:items-center mt-4">
				<div className="flex flex-col md:flex-row md:items-center w-full md:w-auto mb-4 md:mb-0">
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
				{/* <div className="grow" /> */}
				<div className="flex flex-col md:flex-row w-auto justify-end items-start md:items-center">
					<NavbarButtons />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
