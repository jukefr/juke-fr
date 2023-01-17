import ouch from './ouch.glsl';
import rainbow from './rainbow.glsl';
import ripple from './ripple.glsl';
import ripple2 from './ripple2.glsl';
import sandbox from './sandbox.glsl';
import spaghet from './spaghet.glsl';
import wave from './wave.glsl';
import zebra from './zebra.glsl';

const allShaders = [
  {
    value: rainbow,
  },
  {
    value: sandbox,
  },
  {
    value: wave,
  },
  {
    value: ripple,
  },
  {
    value: ripple2,
  },
  {
    value: ouch,
    hasIncreasedMotion: true,
  },
  {
    value: spaghet,
  },
  {
    value: zebra,
  },
];

export default function getRandomShader(
  previousShader: string,
  prefersReducedMotion?: boolean,
): string {
  const shaders = allShaders.filter(({ hasIncreasedMotion }) => {
    if (prefersReducedMotion && hasIncreasedMotion) return false;
    return true;
  });
  const randomShader = shaders[Math.floor(Math.random() * shaders.length)];
  if (randomShader.value === previousShader) {
    return getRandomShader(previousShader, prefersReducedMotion);
  }
  return randomShader.value;
}
