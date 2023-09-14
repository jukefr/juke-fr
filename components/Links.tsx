'use client';

import NextLink from 'next/link'; // ! requires use client
import { ReactNode } from 'react';
import { LuExternalLink } from 'react-icons/lu';

export default function Link({
  href,
  children,
  isExternal,
  className,
}: {
  href: string;
  children: ReactNode;
  isExternal: boolean;
  className: string;
}): JSX.Element {
  return (
    <NextLink
      href={href}
      target={isExternal ? '_blank' : '_self'}
      className={`text-lg hover:decoration-auto hover:underline active:font-bold ${
        className || ''
      }`}
      rel="noreferrer"
      passHref
      scroll={false}
    >
      {children} {isExternal && <LuExternalLink className="inline" />}
    </NextLink>
  );
}

export const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <NextLink
    href={href}
    passHref
    scroll={false}
    className="flex mr-3 font-semibold rounded-sm ring-2 px-6 py-2 active:underline shadow-md
  hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-600 hover:to-purple-800
  active:bg-gradient-to-r active:from-indigo-600 active:via-purple-700 active:to-purple-900
text-black dark:text-white ring-black dark:ring-white hover:text-white active:text-white"
  >
    {children}
  </NextLink>
);

export const NavbarButton = ({
  ariaLabel,
  onClick,
  children,
}: {
  ariaLabel: string;
  onClick(): void;
  children: ReactNode;
}) => (
  <button
    aria-label={ariaLabel}
    className={`p-3 ml-3 rounded-sm ring-2 shadow-md
      hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-600 hover:to-purple-800
      active:bg-gradient-to-r active:from-indigo-600 active:via-purple-700 active:to-purple-900
    text-black dark:text-white ring-black dark:ring-white hover:text-white active:text-white`}
    onClick={onClick}
  >
    {children}
  </button>
);
