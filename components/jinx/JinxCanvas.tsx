/* eslint-disable react/no-unknown-property */
'use client';

import { A11y, A11yAnnouncer } from '@react-three/a11y';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import {
  ACESFilmicToneMapping,
  Clock,
  PerspectiveCamera,
  Texture,
  Vector2,
} from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import jinx from '../assets/jinx.png';
import styles from './Jinx.module.css';
import JinxEditor from './JinxEditor';
import JinxMyBeloved from './JinxMesh';
import getRandomShader from '../assets/shaders/index';

interface IScale {
  base: number;
  hover: number;
  click: number;
}

const getScale = (prefersReducedMotion: boolean): IScale => {
  if (prefersReducedMotion) {
    return {
      base: 1,
      hover: 1.05,
      click: 1.1,
    };
  }
  return {
    base: 1,
    hover: 1.1,
    click: 1.3,
  };
};

const checkForWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

const getRandomValue = (lower: number, upper: number) => {
  return Math.random() * (upper - lower) + lower;
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export default function Jinx() {
  const [FragmentShader, SetFragmentShader] = useState<string>('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState('false');
  const [deltaMultiplier] = useState(1);
  const [timer] = useState(new Clock());

  const [vertexShader, setVertexShader] = useState<string>(`varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`);
  const [hoverV, setHoverV] = useState<number>(-30);
  const [springState, setSpringState] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [clientSize, setClientSize] = useState({ width: 420, height: 420 });
  const [hasWebGL, setHasWebGL] = useState(false);

  const setRandomFragmentShader = () => {
    const newShader = getRandomShader(
      FragmentShader,
      prefersReducedMotion === 'true',
    );
    SetFragmentShader(newShader);
    localStorage.fragmentShader = newShader;
    window.dispatchEvent(new Event('storage'));
  };
  // refs
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // state

  // took me so much time debugger; calling line by line to find where the error was and
  // thank fuck for https://github.com/pmndrs/react-three-fiber/issues/318#issuecomment-602812607
  const [jinxTexture, setJinxTexture] = useState(new Texture());
  useEffect(() => {
    new TextureLoader().load(jinx.src, setJinxTexture);
  }, [jinx.src]);
  // debugger;
  // const jinxTexture = useLoader(TextureLoader, jinx.src);

  // rendering
  const shader = {
    uniforms: {
      u_time: {
        value: timer.getElapsedTime() * deltaMultiplier,
      },
      u_resolution: { value: new Vector2(420, 420) },
      u_texture: { value: jinxTexture },
    },
    vertexShader,
    fragmentShader: FragmentShader,
  };
  const perspective = 800;
  const fov = (180 * (2 * Math.atan(420 / 2 / perspective))) / Math.PI;
  const camera = new PerspectiveCamera(fov, 420 / 420, 1, 1000);
  camera.position.set(0, 0, perspective);

  const jinxSpring = useSpring({
    transform: hoverState ? `rotate(${hoverV}deg)` : 'rotate(0deg)',
    scale: hoverState
      ? springState
        ? getScale(prefersReducedMotion === 'true').click
        : getScale(prefersReducedMotion === 'true').hover
      : getScale(prefersReducedMotion === 'true').base,
    config: {
      tension: prefersReducedMotion === 'true' ? 100 : 300,
      friction: prefersReducedMotion === 'true' ? 10 : 10,
    },
  });

  useEffect(() => {
    setHoverV(
      prefersReducedMotion === 'true'
        ? getRandomValue(-5, 5)
        : getRandomValue(-30, 30),
    );
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!localStorage.fragmentShader || localStorage.fragmentShader === '') {
      setRandomFragmentShader();
    }
    // ! handle localStorage changes from
    // ! - prefersReducedMotion
    // ! - fragmentShader
    window.addEventListener('storage', () => {
      setPrefersReducedMotion(localStorage.prefersReducedMotion);
      SetFragmentShader(localStorage.fragmentShader);
    });
    setPrefersReducedMotion(localStorage.prefersReducedMotion);
    SetFragmentShader(localStorage.fragmentShader);

    const handleResize = () => {
      setClientSize(getWindowDimensions());
    };
    handleResize(); // set initial size on load
    window.addEventListener('resize', handleResize);
    setHasWebGL(checkForWebGL());
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', () => {});
    };
  }, []);

  return (
    <div className="w-[100%] grid grid-cols-1 h-[100%] min-h-[420px]">
      {hasWebGL ? (
        <div
          className={`row-start-1 col-start-1 flex w-[100%] min-h-[420px] justify-center max-w-[${
            clientSize.width - 65
          }px]`}
        >
          <animated.div
            style={{
              ...jinxSpring,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              KhtmlUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
            }}
            onMouseDown={() => {
              setSpringState(true);
            }}
            onMouseUp={() => {
              setSpringState(false);
              setHoverV(
                prefersReducedMotion === 'true'
                  ? getRandomValue(-5, 5)
                  : getRandomValue(-30, 30),
              );
            }}
            onTouchStart={() => {
              setSpringState(true);
              setHoverState(true);
            }}
            onTouchEnd={() => {
              setSpringState(false);
              setHoverState(false);
              setHoverV(
                prefersReducedMotion === 'true'
                  ? getRandomValue(-5, 5)
                  : getRandomValue(-30, 30),
              );
            }}
            onMouseEnter={() => {
              setHoverState(true);
            }}
            onMouseLeave={() => {
              setHoverState(false);
              setSpringState(false);
              setHoverV(
                prefersReducedMotion === 'true'
                  ? getRandomValue(-5, 5)
                  : getRandomValue(-30, 30),
              );
            }}
          >
            <div>
              <Canvas
                camera={camera}
                onCreated={({ gl }) => {
                  gl.toneMapping = ACESFilmicToneMapping;
                  gl.outputColorSpace = 'srgb';
                }}
                className={styles.canvas}
                ref={canvasRef}
              >
                <ambientLight intensity={0.5} />

                <A11y
                  role="button"
                  description="Jinx the cat rendered in realtime with various random shaders applied to them."
                  activationMsg="Got a new random shader!"
                  actionCall={() => {
                    setRandomFragmentShader();
                  }}
                >
                  <JinxMyBeloved
                    shader={shader}
                    setRandomFragmentShader={setRandomFragmentShader}
                    prefersReducedMotion={prefersReducedMotion === 'true'}
                    timer={timer}
                  />
                </A11y>
              </Canvas>
              <A11yAnnouncer />
            </div>
          </animated.div>
        </div>
      ) : (
        <div className="text-center">
          <p>sowwy you dont have webgl :(</p>
          <p>
            or the client side is just loading i&apos;ll implement a proper
            check someday :^)
          </p>
        </div>
      )}
      <JinxEditor
        setVertexShader={setVertexShader}
        vertexShader={vertexShader}
      />
    </div>
  );
}
