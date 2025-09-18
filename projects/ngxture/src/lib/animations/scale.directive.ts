// src/lib/animations/scale.directive.ts
import { Directive, ElementRef, Input } from '@angular/core';
import { BaseAnimationDirective } from './animation-base.directive';
import { AnimationService } from '../services';
import { TransformParts } from '../services/transform-util';

@Directive({ selector: '[ngScale]' })
export class ScaleDirective extends BaseAnimationDirective {
  @Input() scale = 1;
  @Input() scaleSensitivity = 1;

  constructor(el: ElementRef<HTMLElement>, animationService: AnimationService) {
    super(el, animationService);
  }

  protected mapGestureToParts(ev: any): Partial<TransformParts> | null {
    if (ev == null) return null;
    const s =
      typeof ev.scale === 'number'
        ? ev.scale * this.scaleSensitivity
        : this.scale;
    return { scale: s };
  }

  protected getStaticParts(): Partial<TransformParts> | null {
    return { scale: this.scale };
  }
}
