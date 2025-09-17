import { Directive } from '@angular/core';
import { BaseAnimationDirective } from './animation-base.directive';
import { FadeAnimationConfig } from '../services/animation-util';

@Directive({
  selector: '[ngxFade]',
})
export class FadeDirective extends BaseAnimationDirective<FadeAnimationConfig> {
  protected buildFactory(config: FadeAnimationConfig) {
    const duration = config.duration ?? 300;
    const easing = config.easing ?? 'ease-in-out';
    const opacity = config.opacity ?? 0;

    return this.animateToStyle(duration, easing, { opacity });
  }
}
