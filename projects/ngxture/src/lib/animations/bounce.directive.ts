import { Directive } from '@angular/core';
import { style } from '@angular/animations';
import { BaseAnimationDirective } from './animation-base.directive';
import { BounceAnimationConfig } from '../services/animation-util';

@Directive({
  selector: '[ngxBounce]',
})
export class BounceDirective extends BaseAnimationDirective<BounceAnimationConfig> {
  protected buildFactory(config: BounceAnimationConfig) {
    const duration = config.duration ?? 600;
    const easing = config.easing ?? 'ease-out';
    const scale = config.scale ?? 1.2;
    const times = Math.max(1, config.times ?? 2);
    const frames: any[] = [];

    const step = 1 / (times * 2);
    for (let i = 0; i < times; i++) {
      frames.push(
        style({ transform: `scale(${scale})`, offset: i * 2 * step })
      );
      frames.push(style({ transform: 'scale(1)', offset: (i * 2 + 1) * step }));
    }

    return this.animateKeyframes(duration, easing, frames);
  }
}
