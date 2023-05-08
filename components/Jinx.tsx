import { Box, useToast, Text, Flex } from '@chakra-ui/react';
import { A11y, A11yAnnouncer, useUserPreferences } from '@react-three/a11y';
import { Canvas, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import {
  ACESFilmicToneMapping,
  PerspectiveCamera,
  sRGBEncoding,
  Vector2,
} from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import jinx from './assets/jinx.png';
import styles from './Jinx.module.css';
import JinxEditor from './JinxEditor';
import JinxMyBeloved from './JinxMyBeloved';
import getRandomShader from './shaders/index';
import {
  selectFragmentShader,
  updateFragmentShader,
} from './store/fragmentShader';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  selectPrefersReducedMotion,
  update as updatePrefersReducedMotion,
} from './store/prefersReducedMotion';
import { selectTimer } from './store/timer';
import { add as addToaster, selectToasters } from './store/toasters';

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
  const toast = useToast();
  const { a11yPrefersState } = useUserPreferences();

  // redux
  const fragmentShader = useAppSelector(selectFragmentShader);
  const toasters = useAppSelector(selectToasters);
  const timer = useAppSelector(selectTimer);
  const prefersReducedMotion = useAppSelector(selectPrefersReducedMotion);
  const dispatch = useAppDispatch();
  const setRandomFragmentShader = () => {
    dispatch(
      updateFragmentShader(
        getRandomShader(fragmentShader, prefersReducedMotion),
      ),
    );
  };
  // refs
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // state
  const [vertexShader, setVertexShader] = useState<string>(`varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`);
  const [hoverV, setHoverV] = useState<number>(-30);
  const [springState, setSpringState] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [clientSize, setClientSize] = useState(getWindowDimensions());
  const [hasWebGL, setHasWebGL] = useState(false);

  // rendering
  const deltaMultiplier = prefersReducedMotion ? 1 : 5;
  const jinxTexture = useLoader(TextureLoader, jinx.src);
  const shader = {
    uniforms: {
      u_time: { value: timer.getElapsedTime() * deltaMultiplier },
      u_resolution: { value: new Vector2(420, 420) },
      u_texture: { value: jinxTexture },
    },
    vertexShader,
    fragmentShader: fragmentShader,
  };
  const perspective = 800;
  const fov = (180 * (2 * Math.atan(420 / 2 / perspective))) / Math.PI;
  const camera = new PerspectiveCamera(fov, 420 / 420, 1, 1000);
  camera.position.set(0, 0, perspective);

  const jinxSpring = useSpring({
    transform: hoverState ? `rotate(${hoverV}deg)` : 'rotate(0deg)',
    scale: hoverState
      ? springState
        ? getScale(prefersReducedMotion).click
        : getScale(prefersReducedMotion).hover
      : getScale(prefersReducedMotion).base,
    config: {
      tension: prefersReducedMotion ? 100 : 300,
      friction: prefersReducedMotion ? 10 : 10,
    },
  });

  useEffect(() => {
    const toastId = 'editor';
    // const jinxToastId = 'jinx';
    // if (!toasters.includes(jinxToastId)) {
    //   dispatch(addToaster(jinxToastId));

    //   toast({
    //     id: `${jinxToastId}-${Date.now()}`,
    //     title: 'this website uses analytics',
    //     isClosable: true,
    //     description:
    //       'to get an idea of the traffic but i honor Do Not Track settings :D the stats are public on https://stats.juke.fr/share/3ZhRtUIe/juke.fr',
    //     duration: 123000,
    //     status: 'info',
    //     position: 'top',
    //   });
    // }
    if (!toasters.includes(toastId)) {
      dispatch(addToaster(toastId));

      toast({
        id: `${toastId}-${Date.now()}`,
        title: 'jinx my beloved',
        isClosable: true,
        duration: 15000,
        status: 'info',
        description:
          'click the jinx to get a new random shader! you can also live edit it! feel free to share any cool results you want added to the site!',
        position: 'top',
      });
    }
  }, [dispatch, toasters]);

  useEffect(() => {
    setHoverV(
      prefersReducedMotion ? getRandomValue(-5, 5) : getRandomValue(-30, 30),
    );
  }, [prefersReducedMotion]);

  useEffect(() => {
    dispatch(updatePrefersReducedMotion(a11yPrefersState.prefersReducedMotion));
  }, [a11yPrefersState.prefersReducedMotion, prefersReducedMotion, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setClientSize(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    setHasWebGL(checkForWebGL());
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        height: '100%',
        minHeight: '420px',
      }}
    >
      {hasWebGL ? (
        <Box
          boxSize="sm"
          mb={0}
          style={{
            gridRowStart: '1',
            gridColumnStart: '1',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            minHeight: '420px',
            maxWidth: `${clientSize.width - 65}px`,
          }}
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
                prefersReducedMotion
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
                prefersReducedMotion
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
                prefersReducedMotion
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
                  gl.outputEncoding = sRGBEncoding;
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
                    prefersReducedMotion={prefersReducedMotion}
                    timer={timer}
                  />
                </A11y>
              </Canvas>
              <A11yAnnouncer />
            </div>
          </animated.div>
        </Box>
      ) : (
        <Flex w="100%" h="100%" align="center" justify="center">
          <Text>sowwy you dont have webgl :(</Text>
        </Flex>
      )}
      <JinxEditor
        setVertexShader={setVertexShader}
        vertexShader={vertexShader}
      />
    </div>
  );
}
