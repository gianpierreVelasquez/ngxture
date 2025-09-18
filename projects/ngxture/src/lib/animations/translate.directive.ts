import { Directive, ElementRef, Input } from '@angular/core';
import { BaseAnimationDirective } from './animation-base.directive';
import { AnimationService } from '../services';
import { TransformParts } from '../services/transform-util';

@Directive({ selector: '[ngTranslate]' })
export class TranslateDirective extends BaseAnimationDirective {
  @Input() x = 0;
  @Input() y = 0;

  constructor(el: ElementRef<HTMLElement>, animationService: AnimationService) {
    super(el, animationService);
  }

  protected mapGestureToParts(ev: any): Partial<TransformParts> | null {
    if (!ev) return null;
    const tx = typeof ev.deltaX === 'number' ? ev.deltaX : this.x;
    const ty = typeof ev.deltaY === 'number' ? ev.deltaY : this.y;

    return { translateX: tx, translateY: ty };
  }

  protected getStaticParts(): Partial<TransformParts> | null {
    return { translateX: this.x, translateY: this.y };
  }
}
