export type GestureType =
  | 'pan'
  | 'pinch'
  | 'press'
  | 'pressup'
  | 'rotate'
  | 'swipe'
  | 'tap'
  | 'doubletap'
  | 'tripletap';

export interface GestureConfig {
  type: GestureType;
  options?: RecognizerOptions;
}

export const defaultConfig: GestureConfig[] = [
  {
    type: 'pan',
    options: { direction: Hammer.DIRECTION_ALL, threshold: 10 },
  },
  {
    type: 'pinch',
    options: { enable: true },
  },
  {
    type: 'press',
    options: { time: 251, threshold: 9 },
  },
  {
    type: 'pressup',
    options: { time: 251, threshold: 9, event: 'pressup' },
  },
  {
    type: 'rotate',
    options: {},
  },
  {
    type: 'swipe',
    options: {
      direction: Hammer.DIRECTION_ALL,
      threshold: 10,
      velocity: 0.3,
    },
  },
  {
    type: 'tap',
    options: { taps: 1 },
  },
  {
    type: 'doubletap',
    options: { taps: 2 },
  },
  {
    type: 'tripletap',
    options: { taps: 3 },
  },
];
