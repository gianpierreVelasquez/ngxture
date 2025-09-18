export type GestureType =
  | 'pan'
  | 'panstart'
  | 'panmove'
  | 'panend'
  | 'pancancel'
  | 'pinch'
  | 'pinchstart'
  | 'pinchmove'
  | 'pinchend'
  | 'pinchcancel'
  | 'press'
  | 'pressup'
  | 'rotate'
  | 'rotatestart'
  | 'rotatemove'
  | 'rotateend'
  | 'rotatecancel'
  | 'swipe'
  | 'swipeleft'
  | 'swiperight'
  | 'swipeup'
  | 'swipedown'
  | 'tap'
  | 'doubletap'
  | 'tripletap';

export interface GestureConfig {
  type: GestureType;
  options?: RecognizerOptions;
}

export const defaultGestureConfig: GestureConfig[] = [
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
    options: { enable: true },
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
