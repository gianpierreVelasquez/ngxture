export type AnimationType =
  | 'scale'
  | 'rotate'
  | 'fade'
  | 'translate'
  | 'skew'
  | 'color'
  | 'bounce';

export interface BaseAnimationConfig {
  type?: AnimationType;
  duration?: number;
  easing?: string;
  delay?: number;
}

export interface ScaleAnimationConfig extends BaseAnimationConfig {
  type: 'scale';
  scale?: number;
}

export interface RotationAnimationConfig extends BaseAnimationConfig {
  type: 'rotate';
  degrees?: number;
}

export interface TranslateAnimationConfig extends BaseAnimationConfig {
  type: 'translate';
  x?: number;
  y?: number;
}

export interface FadeAnimationConfig extends BaseAnimationConfig {
  type: 'fade';
  opacity?: number;
}

export interface ColorAnimationConfig extends BaseAnimationConfig {
  type: 'color';
  color?: string;
  property?: 'color' | 'backgroundColor';
}

export interface SkewAnimationConfig extends BaseAnimationConfig {
  type: 'skew';
  x?: number;
  y?: number;
}

export interface BounceAnimationConfig extends BaseAnimationConfig {
  type: 'bounce';
  scale?: number;
  times?: number;
}

export type AnimationConfig =
  | ScaleAnimationConfig
  | RotationAnimationConfig
  | TranslateAnimationConfig
  | FadeAnimationConfig
  | ColorAnimationConfig
  | SkewAnimationConfig
  | BounceAnimationConfig;
