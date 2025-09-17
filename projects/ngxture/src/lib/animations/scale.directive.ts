import { Directive, ElementRef } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { BaseAnimationDirective } from './animation-base.directive';
import { ScaleAnimationConfig } from '../services/animation-util';
import { TransformMergeService } from '../services/transform.service';

@Directive({
  selector: '[ngxScale]',
})
export class ScaleDirective extends BaseAnimationDirective<ScaleAnimationConfig> {
  constructor(
    protected override el: ElementRef<HTMLElement>,
    protected override builder: AnimationBuilder,
    protected override transformMerge: TransformMergeService
  ) {
    super(el, builder, transformMerge);
  }

  protected buildFactory(config: ScaleAnimationConfig) {
    const duration = config.duration ?? 300;
    const easing = config.easing ?? 'ease-out';
    const scale = config.scale ?? 1.2;

    const transformStr = this.transformMerge.setTransform(
      this.el.nativeElement,
      'scale',
      `scale(${scale})`
    );

    return this.builder.build([
      animate(`${duration}ms ${easing}`, style({ transform: transformStr })),
    ]);
  }
}
