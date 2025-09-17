import { Directive, ElementRef } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { BaseAnimationDirective } from './animation-base.directive';
import { TranslateAnimationConfig } from '../services/animation-util';
import { TransformMergeService } from '../services/transform.service';

@Directive({
  selector: '[ngxTranslate]',
})
export class TranslateDirective extends BaseAnimationDirective<TranslateAnimationConfig> {
  constructor(
    el: ElementRef<HTMLElement>,
    builder: AnimationBuilder,
    transformMerge: TransformMergeService
  ) {
    super(el, builder, transformMerge);
  }

  protected buildFactory(config: TranslateAnimationConfig) {
    const duration = config.duration ?? 300;
    const easing = config.easing ?? 'ease-out';
    const x = config.x ?? 0;
    const y = config.y ?? 0;

    const transformStr = this.transformMerge.setTransform(
      this.el.nativeElement,
      'translate',
      `translate(${x}px, ${y}px)`
    );

    return this.builder.build([
      animate(`${duration}ms ${easing}`, style({ transform: transformStr })),
    ]);
  }
}
