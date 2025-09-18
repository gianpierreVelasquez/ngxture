import { Directive, ElementRef, Input } from '@angular/core';
import { BaseAnimationDirective } from './animation-base.directive';
import { AnimationService } from '../services';
import { TransformParts } from '../services/transform-util';

@Directive({ selector: '[ngRotate]' })
export class RotationDirective extends BaseAnimationDirective {
  @Input() degrees = 0;
  @Input() rotateOffset = 0; // additional offset degrees

  constructor(el: ElementRef<HTMLElement>, animationService: AnimationService) {
    super(el, animationService);
  }

  protected mapGestureToParts(ev: any): Partial<TransformParts> | null {
    if (ev == null) return null;
    const deg =
      (typeof ev.rotation === 'number' ? ev.rotation : this.degrees) +
      this.rotateOffset;

    return { rotate: deg };
  }

  protected getStaticParts(): Partial<TransformParts> | null {
    return { rotate: this.degrees + this.rotateOffset };
  }
}
