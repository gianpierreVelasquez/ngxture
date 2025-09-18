export interface TransformParts {
  translateX?: number; // px
  translateY?: number; // px
  translateZ?: string; // e.g '0px' or '50%'
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number; // degrees
  skewX?: number; // degrees
  skewY?: number; // degrees
  raw?: string;
}

export interface MergeOptions {
  animate?: boolean;
  duration?: number; // ms
  easing?: string; // css easing
  delay?: number; // ms
  fill?: 'forwards' | 'both' | 'none';
}

export interface ElementState {
  parts: TransformParts;
  cssProps: Record<string, string | null>; // e.g. opacity, color
  rawOverride?: string | null; // if a raw transform string was provided
  currentAnimation?: Animation | null;
}

export const DEFAULT_ANIM: Partial<MergeOptions> = {
  animate: false,
  duration: 200,
  easing: 'ease',
  delay: 0,
  fill: 'forwards',
};
