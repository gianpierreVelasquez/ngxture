import { Directive, ElementRef } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { BaseAnimationDirective } from './animation-base.directive';
import { SkewAnimationConfig } from '../services/animation-util';
import { TransformMergeService } from '../services/transform.service';

@Directive({
  selector: '[ngxSkew]',
})
export class SkewDirective extends BaseAnimationDirective<SkewAnimationConfig> {
  constructor(
    el: ElementRef<HTMLElement>,
    builder: AnimationBuilder,
    transformMerge: TransformMergeService
  ) {
    super(el, builder, transformMerge);
  }

  protected buildFactory(config: SkewAnimationConfig) {
    const duration = config.duration ?? 300;
    const easing = config.easing ?? 'ease-in-out';
    const x = config.x ?? 0;
    const y = config.y ?? 0;

    const transformStr = this.transformMerge.setTransform(
      this.el.nativeElement,
      'skew',
      `skew(${x}deg, ${y}deg)`
    );

    return this.builder.build([
      animate(`${duration}ms ${easing}`, style({ transform: transformStr })),
    ]);
  }
}
