import { Directive, ElementRef, Input } from '@angular/core';
import { BaseAnimationDirective } from './animation-base.directive';
import { AnimationService } from '../services';
@Directive({ selector: '[ngBounce]' })
export class BounceDirective extends BaseAnimationDirective {
  @Input() amplitude = 1.15;
  @Input() times = 3;

  constructor(el: ElementRef<HTMLElement>, animationService: AnimationService) {
    super(el, animationService);
  }

  protected mapGestureToParts(ev: any): Partial<CSSStyleDeclaration> | null {
    // on gesture end you might trigger a bounce; mapping depends on payload
    // return null during gesture moves (unless you want interactive bounce)
    return null;
  }

  protected getStaticParts(): Partial<CSSStyleDeclaration> | null {
    // bounce is an animation sequence — use transformMerge.update with animate options via AnimationService.applyTransform where needed
    // For static init, we won't apply transform
    return null;
  }

  /** You could create a manual method to trigger bounce animation */
  public triggerBounce() {
    const el = this.el.nativeElement;
    const seq = [
      { transform: 'scale(1)' },
      { transform: `scale(${this.amplitude})` },
      { transform: 'scale(1)' },
    ];

    el.animate(seq, {
      duration: 300,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      iterations: 1,
      fill: 'forwards',
    });
  }
}
