import { Directive, ElementRef, Input } from '@angular/core';
import { BaseAnimationDirective } from './animation-base.directive';
import { AnimationService } from '../services';

@Directive({ selector: '[ngFade]' })
export class FadeDirective extends BaseAnimationDirective {
  @Input() opacity = 1;

  constructor(el: ElementRef<HTMLElement>, animationService: AnimationService) {
    super(el, animationService);
  }

  protected mapGestureToParts(ev: any): Partial<CSSStyleDeclaration> | null {
    if (!ev) return null;

    const o = typeof ev.alpha === 'number' ? ev.alpha : this.opacity;

    return { opacity: String(o) };
  }

  protected getStaticParts(): Partial<CSSStyleDeclaration> | null {
    return { opacity: String(this.opacity) };
  }
}
