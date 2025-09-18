import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AnimationService,
  GestureService,
  TransformMergeService,
} from './services';
import {
  PanDirective,
  PinchDirective,
  PressDirective,
  RotateDirective,
  SwipeDirective,
  TapDirective,
} from './gestures';
import {
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
  RotateDirective,
  SwipeDirective,
  TapDirective,
  // Animations
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
