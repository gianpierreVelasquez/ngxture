import { Directive } from '@angular/core';
import { ColorAnimationConfig } from '../services/animation-util';
import { BaseAnimationDirective } from './animation-base.directive';

@Directive({
  selector: '[ngxColor]',
})
export class ColorDirective extends BaseAnimationDirective<ColorAnimationConfig> {
  protected buildFactory(config: ColorAnimationConfig) {
    const duration = config.duration ?? 300;
    const easing = config.easing ?? 'ease-in-out';
    const prop = config.property ?? 'color';
    const color = config.color ?? '#000';

    return this.animateToStyle(duration, easing, { [prop]: color });
  }
}
