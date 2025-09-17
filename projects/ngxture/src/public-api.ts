/*
 * Public API Surface of ngxture
 */

// Core Module
export * from './lib/ngxture.module';

// Gestures
export * from './lib/services/gesture.service';
export * from './lib/gestures/gesture-base.directive';

// Gesture Directives
export * from './lib/gestures/pan.directive';
export * from './lib/gestures/pinch.directive';
export * from './lib/gestures/press.directive';
export * from './lib/gestures/pressup.directive';
export * from './lib/gestures/rotate.directive';
export * from './lib/gestures/swipe.directive';
export * from './lib/gestures/tap.directive';
export * from './lib/gestures/doubletap.directive';
export * from './lib/gestures/tripletap.directive';

// Animation
export * from './lib/services/animations.service';
export * from './lib/animations/animation-base.directive';

// Animation Directives
export * from './lib/animations/animation.directive';
export * from './lib/animations/bounce.directive';
export * from './lib/animations/color.directive';
export * from './lib/animations/fade.directive';
export * from './lib/animations/rotation.directive';
export * from './lib/animations/scale.directive';
export * from './lib/animations/skew.directive';
export * from './lib/animations/translate.directive';

// Abstract base classes (optional for extension)
// export * from './lib/gestures/gesture-base.directive';
// export * from './lib/animations/animation-base.directive';
