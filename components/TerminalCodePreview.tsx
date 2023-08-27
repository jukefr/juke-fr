'use client';

import { useEffect } from 'react';
import hljs from 'highlight.js';
import './assets/highlightjsDracula.css';

const getRandomColor = ({ noBG }: any) => {
  const colors = ['bg-gray-100', 'bg-cyan-400', 'bg-pink-400'];
  if (noBG) return 'bg-transparent';
  return colors[Math.floor(Math.random() * colors.length)];
};

const TerminalCodePreview = ({ children, lang, noBG }: any) => {
  useEffect(() => {
    hljs.highlightAll(); // ! client side because this uses document.
  }, []);
  return (
    <div className={`${getRandomColor({ noBG })} py-6 px-6 my-2`}>
      <pre className="p-6 shadow-xl rounded-lg">
        <code
          className={`${lang} block whitespace-unset text-white overflow-x-scroll`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
};

export default TerminalCodePreview;
