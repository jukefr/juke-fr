'use client';

import { Hook, Unhook } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Console';
import hljs from 'highlight.js/lib/core';
import glsl from 'highlight.js/lib/languages/glsl';
import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import styles from './JinxEditor.module.css';
import './highlightjsDracula.css';
hljs.registerLanguage('glsl', glsl);

// VERTEX | FRAGMENT
//
// ERROR: 0:0: '#version 300 es' is not allowed.
const vertexLine = 57;
const magicNumber = 3; // WARN: if it breaks its probably here
const parseLog = (log: string, vertexShader: string) => {
  const shaderType = log.includes('VERTEX') ? 'vertex' : 'fragment';
  const error = log
    .split(shaderType === 'vertex' ? 'VERTEX' : 'FRAGMENT')[1]
    .trim()
    .split('\n')[0]
    .trim();
  const line = Number(error.split('ERROR: 0:')[1].split(':')[0] || '');
  const errorMessage =
    error.split('ERROR: 0:')[1].split(':').slice(1).join(':') || '';
  const vertexEnd = vertexLine + vertexShader.split('\n').length;
  const section =
    line > vertexLine && line <= vertexEnd ? 'vertex' : 'fragment';
  const mappedLine =
    section === 'vertex' ? line - vertexLine : line - vertexEnd - magicNumber;
  return { section, mappedLine, errorMessage };
};

const JinxEditor = ({
  vertexShader,
  setVertexShader,
}: {
  vertexShader: string;
  setVertexShader: (shader: string) => void;
}) => {
  // state
  const [statusVertex, setStatusVertex] = useState<string>('');
  const [statusFragment, setStatusFragment] = useState<string>('');
  const [showEditor, setShowEditor] = useState<string>('false');
  const [FragmentShader, SetFragmentShader] = useState<string>('');

  // effects
  useEffect(() => {
    // okay so basiaclly they dont emit any error or any event of any kind just log to the console 5head
    const hooked = Hook(
      window.console,
      (log: Message) => {
        if (
          log?.method === 'error' &&
          log?.data?.[0].startsWith(
            'THREE.WebGLProgram: Shader Error 1282 - VALIDATE_STATUS',
          )
        ) {
          const { section, mappedLine, errorMessage } = parseLog(
            log.data[0],
            vertexShader,
          );
          section === 'vertex'
            ? setStatusVertex(`[${mappedLine}] ${errorMessage}`)
            : setStatusFragment(`[${mappedLine}] ${errorMessage}`);
        }
      },
      false,
    );
    return () => {
      Unhook(hooked);
    };
  }, [vertexShader, FragmentShader]);

  const keyHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        showEditor === 'true' ? setShowEditor('false') : setShowEditor('true');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // ! handle localStorage changes from
    // ! - toggleEditor
    window.addEventListener('storage', () => {
      setShowEditor(localStorage.showEditor);
      SetFragmentShader(localStorage.fragmentShader);
    });
    setShowEditor(localStorage.showEditor);
    SetFragmentShader(localStorage.fragmentShader);
    // ! keyboard handlers
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
      window.removeEventListener('storage', () => {});
    };
  }, []);

  return (
    <div
      className={`jinx-editor content
      bg-darker-900 bg-opacity-90 dark:bg-darker-900 dark:bg-opacity-20
      mb-6 rounded-t-sm w-full row-start-1 col-start-1 p-0 z-99
      ${showEditor === 'true' ? 'block' : 'hidden'}`}
    >
      <label htmlFor="vertex-editor" className={styles.label}>
        vertex shader
      </label>
      <Editor
        key="vertexEditor"
        value={vertexShader}
        onValueChange={(code) => {
          setVertexShader(code);
          setStatusVertex('');
        }}
        highlight={(code) =>
          hljs
            .highlight(code, { language: 'glsl' })
            .value.split('\n')
            .map((line) => `<span class="${styles.lineNumber}">${line}</span>`)
            .join('\n')
        }
        style={{
          color: '#f8f8f2',
          overflow: 'initial',
        }}
        textareaClassName={`foobar-maintaining-fun-1 ${styles.editorContainer}`}
        textareaId="vertex-editor"
        className={styles.editorContainer}
      />
      <div className="statusBar bg-red-200 w-full text-black">
        {statusVertex}
      </div>
      <label htmlFor="fragment-editor" className={styles.label}>
        fragment shader
      </label>
      <Editor
        key="fragmentEditor"
        value={FragmentShader} // no clue but hey it works :shrug:
        onValueChange={(code) => {
          localStorage.fragmentShader = code;
          window.dispatchEvent(new Event('storage'));
          setStatusFragment('');
        }}
        highlight={(code) =>
          hljs
            .highlight(code, { language: 'glsl' })
            .value.split('\n')
            .map((line) => `<span class="${styles.lineNumber}">${line}</span>`)
            .join('\n')
        }
        style={{
          color: '#f8f8f2',
          overflow: 'initial',
        }}
        textareaClassName={`foobar-maintaining-fun-2 ${styles.editorContainer}`}
        textareaId="fragment-editor"
        className={styles.editorParent}
      />
      <div className="statusBar bg-red-200 w-full text-black">
        {statusFragment}
      </div>
    </div>
  );
};

export default JinxEditor;
