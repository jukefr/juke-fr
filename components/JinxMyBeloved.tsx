import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import type { Clock, ShaderMaterial } from 'three';
import sound from './assets/meow.mp3';

const playAudio = (audio?: HTMLAudioElement): void => {
  setTimeout(() => {
    audio?.play();
  }, 0);
};

const getRandomValue = (lower: number, upper: number) => {
  return Math.random() * (upper - lower) + lower;
};

interface IShader {
  uniforms: {
    u_time: { value: number };
    u_resolution: { value: THREE.Vector2 };
    u_texture: { value: THREE.Texture };
  };
  vertexShader: string;
  fragmentShader: string;
}

interface IJinxMyBelovedProps {
  shader: IShader;
  setRandomFragmentShader: () => void;
  prefersReducedMotion?: boolean;
  timer: Clock;
}

const JinxMyBeloved = ({
  shader,
  setRandomFragmentShader,
  prefersReducedMotion,
  timer,
}: IJinxMyBelovedProps) => {
  const meow = () => {
    if (!prefersReducedMotion) {
      const audio = new Audio(sound);
      audio.volume = getRandomValue(0.1, 0.5);
      playAudio(audio);
    }
    setRandomFragmentShader();
  };

  const ref = useRef<ShaderMaterial>(null);

  // limit to 30fps to be nice
  const [current, setCurrent] = useState(0);
  const interval = 1 / 30;
  const deltaMultiplier = prefersReducedMotion ? 1 : 5;
  useFrame((state, delta) => {
    setCurrent(current + delta);
    if (current > interval) {
      setCurrent(0);
      if (ref.current) {
        ref.current.uniforms.u_time.value += timer.getDelta() * deltaMultiplier;
      }
    }
  });

  return (
    <mesh position={[0, 0, 0]} scale={[420, 420, 1]} onClick={meow}>
      <planeGeometry attach="geometry" args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={ref}
        attach="material"
        args={[shader]}
        transparent={true}
      />
    </mesh>
  );
};

export default JinxMyBeloved;
