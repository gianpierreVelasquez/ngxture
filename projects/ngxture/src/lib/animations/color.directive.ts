import { Directive, ElementRef, Input } from '@angular/core';
import { BaseAnimationDirective } from './animation-base.directive';
import { AnimationService } from '../services';

@Directive({ selector: '[ngColor]' })
export class ColorDirective extends BaseAnimationDirective {
  @Input() color?: string;

  constructor(el: ElementRef<HTMLElement>, animationService: AnimationService) {
    super(el, animationService);
  }

  protected mapGestureToParts(ev: any): Partial<CSSStyleDeclaration> | null {
    if (!ev) return null;

    return { color: this.color ?? '' };
  }

  protected getStaticParts(): Partial<CSSStyleDeclaration> | null {
    return this.color ? { color: this.color } : null;
  }
}
