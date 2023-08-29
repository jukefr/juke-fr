import { ExternalLinkIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function Link({
  href,
  children,
  isExternal,
  className,
}: any): JSX.Element {
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
      {children} {isExternal && <ExternalLinkIcon mx="2px" />}
    </NextLink>
  );
}
