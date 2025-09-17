import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationService, GestureService, TransformMergeService } from './services';
import {
  DoubleTapDirective,
  PanDirective,
  PinchDirective,
  PressDirective,
  PressUpDirective,
  RotateDirective,
  SwipeDirective,
  TapDirective,
  TripleTapDirective,
} from './gestures';
import {
  AnimationDirective,
  BounceDirective,
  ColorDirective,
  FadeDirective,
  RotationDirective,
  ScaleDirective,
  SkewDirective,
  TranslateDirective,
} from './animations';

const DIRECTIVES = [
  // Gestures
  PanDirective,
  PinchDirective,
  PressDirective,
  PressUpDirective,
  RotateDirective,
  SwipeDirective,
  TapDirective,
  DoubleTapDirective,
  TripleTapDirective,
  // Animations
  AnimationDirective,
  BounceDirective,
  ColorDirective,
  FadeDirective,
  RotationDirective,
  ScaleDirective,
  SkewDirective,
  TranslateDirective,
];

@NgModule({
  imports: [BrowserAnimationsModule, CommonModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [GestureService, AnimationService, TransformMergeService],
})
export class NgxtureModule {}
