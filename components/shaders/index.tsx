import ouch from './ouch.glsl';
import rainbow from './rainbow.glsl';
import ripple from './ripple.glsl';
import ripple2 from './ripple2.glsl';
import sandbox from './sandbox.glsl';
import spaghet from './spaghet.glsl';
import wave from './wave.glsl';
import zebra from './zebra.glsl';
import glitch from './glitch.glsl';
import anaglyph from './anaglyph.glsl';
import checkered from './checkered.glsl';
import blurdots from './blurdots.glsl';
import water from './water.glsl';
import scanline from './scanline.glsl'
import random from './random.glsl'

const allShaders = [
  {
    value: rainbow,
  },
  {
    value: sandbox,
    hasIncreasedMotion: true,
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
    hasIncreasedMotion: true,
  },
  {
    value: zebra,
    hasIncreasedMotion: true,
  },
  {
    value: glitch,
    hasIncreasedMotion: true,
  },
  {
    value: anaglyph
  },
  {
    value: checkered
  },
  {
    value: blurdots
  },
  {
    value: water,
    hasIncreasedMotion: true,
  },
  {
    value: scanline,
    hasIncreasedMotion: true,
  },
  {
    value: random,
    hasIncreasedMotion: true,
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
