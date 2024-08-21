import { Metadata } from 'next';
import Link from '../../../components/Links';
import TerminalCodePreview from '../../../components/TerminalCodePreview';
import { description, title } from './meta';

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    title,
    description,
  },
  openGraph: {
    title,
    description,
  },
};

const Boop = (): JSX.Element => {
  const wipSentence = 'this post is still a work in progress';

  return (
    <div className="boop  px-4 md:container md:mx-auto">
      {/* WIP SENTENCE */}
      <div className="grid place-content-center">
        <p className="bg-orange-100 mb-2 text-black inline-block px-2">
          {wipSentence}
        </p>
      </div>
      {/* HEADER */}
      <p>2024-07-21</p>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-xl">{description}</p>
      <hr className="mb-6" />
      {/* CONTENT */}
    </div>
  );
};

export default Boop;
