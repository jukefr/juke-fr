import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
// import Prism from 'prismjs';
import hljs from 'highlight.js/lib/core';
import glsl from 'highlight.js/lib/languages/glsl';
hljs.registerLanguage('glsl', glsl);
// import 'prism-themes/themes/prism-dracula.css';
import { Hook, Unhook } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Console';
import { Box, useBreakpointValue, useColorMode } from '@chakra-ui/react';

import styles from './JinxEditor.module.css';
import './highlightjsDracula.css';
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
  store,
}: {
  vertexShader: string;
  setVertexShader: (shader: string) => void;
  store: any; // TODO: type this
}) => {
  const { colorMode } = useColorMode();
  const rPadding = useBreakpointValue({ base: '0', md: '10px' });

  // state
  const [statusVertex, setStatusVertex] = useState<string>('');
  const [statusFragment, setStatusFragment] = useState<string>('');

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
  }, [vertexShader, store.getter.fragmentShader]);

  const keyHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        store.setter({
          ...store.getter,
          showEditor: !store.getter.showEditor,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return (
    <Box
      mb={6}
      roundedTop={6}
      style={{
        visibility: store.getter.showEditor ? 'visible' : 'hidden',
        display: store.getter.showEditor ? 'block' : 'none',
        width: '100%',
        gridRowStart: '1',
        gridColumnStart: '1',
        padding: rPadding,
        backgroundColor:
          colorMode === 'light' ? 'rgba(40,42,54,0.85)' : 'rgba(40,42,54,0.15)',
        zIndex: '99',
      }}
      className="jinx-editor"
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
            .map(
              (line) =>
                `<span class="${
                  colorMode === 'light'
                    ? styles.lineNumber
                    : styles.lineNumberDark
                }">${line}</span>`,
            )
            .join('\n')
        }
        style={{
          color: colorMode === 'light' ? '#f8f8f2' : '#f8f8f2',
          overflow: 'initial',
        }}
        textareaClassName={`foobar-maintaining-fun-1 ${styles.editorContainer}`}
        textareaId="vertex-editor"
        className={styles.editorContainer}
      />
      <Box
        className="statusBar"
        backgroundColor={'red.200'}
        style={{
          width: '100%',
          color: '#2b2e3b',
        }}
      >
        {statusVertex}
      </Box>
      <label htmlFor="fragment-editor" className={styles.label}>
        fragment shader
      </label>
      <Editor
        key="fragmentEditor"
        value={store.getter.fragmentShader} // no clue but hey it works :shrug:
        onValueChange={(code) => {
          store.setter({
            ...store.getter,
            fragmentShader: code,
          });
          setStatusFragment('');
        }}
        highlight={(code) =>
          hljs
            .highlight(code, { language: 'glsl' })
            .value.split('\n')
            .map(
              (line) =>
                `<span class="${
                  colorMode === 'light'
                    ? styles.lineNumber
                    : styles.lineNumberDark
                }">${line}</span>`,
            )
            .join('\n')
        }
        style={{
          color: colorMode === 'light' ? '#f8f8f2' : '#f8f8f2',
          overflow: 'initial',
        }}
        textareaClassName={`foobar-maintaining-fun-2 ${styles.editorContainer}`}
        textareaId="fragment-editor"
        className={styles.editorParent}
      />
      <Box
        className="statusBar"
        backgroundColor={'red.200'}
        style={{
          width: '100%',
          color: '#2b2e3b',
        }}
      >
        {statusFragment}
      </Box>
    </Box>
  );
};

export default JinxEditor;
