// src/lib/animations/skew.directive.ts
import { Directive, ElementRef, Input } from '@angular/core';
import { BaseAnimationDirective } from './animation-base.directive';
import { AnimationService } from '../services';
import { TransformParts } from '../services/transform-util';

@Directive({ selector: '[ngSkew]' })
export class SkewDirective extends BaseAnimationDirective {
  @Input() skewX = 0;
  @Input() skewY = 0;

  constructor(el: ElementRef<HTMLElement>, animationService: AnimationService) {
    super(el, animationService);
  }

  protected mapGestureToParts(ev: any): Partial<TransformParts> | null {
    if (!ev) return null;

    return { skewX: this.skewX, skewY: this.skewY };
  }

  protected getStaticParts(): Partial<TransformParts> | null {
    return { skewX: this.skewX, skewY: this.skewY };
  }
}
