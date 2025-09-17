import { Directive, ElementRef } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { BaseAnimationDirective } from './animation-base.directive';
import { RotationAnimationConfig } from '../services/animation-util';
import { TransformMergeService } from '../services/transform.service';

@Directive({
  selector: '[ngxRotation]',
})
export class RotationDirective extends BaseAnimationDirective<RotationAnimationConfig> {
  constructor(
    el: ElementRef<HTMLElement>,
    builder: AnimationBuilder,
    transformMerge: TransformMergeService
  ) {
    super(el, builder, transformMerge);
  }

  protected buildFactory(config: RotationAnimationConfig) {
    const duration = config.duration ?? 300;
    const easing = config.easing ?? 'ease-in-out';
    const deg = config.degrees ?? 15;

    const transformStr = this.transformMerge.setTransform(
      this.el.nativeElement,
      'rotate',
      `rotate(${deg}deg)`
    );

    return this.builder.build([
      animate(`${duration}ms ${easing}`, style({ transform: transformStr })),
    ]);
  }
}
