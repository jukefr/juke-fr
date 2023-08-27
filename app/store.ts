import { Clock } from 'three';

export const store = {
  showJinx: false,
  showEditor: false,
  prefersReducedMotion: true,
  fragmentShader: '',
  toasters: [],
  timer: new Clock(),
};

export const writeToLocalStorage = ({ timer, ...state }: any) => {
  localStorage.setItem('state', JSON.stringify(state));
};

export const getFromLocalStorage = () => {
  const localState = localStorage.getItem('state');
  if (localState) {
    return JSON.parse(localState);
  }
  return undefined;
};
