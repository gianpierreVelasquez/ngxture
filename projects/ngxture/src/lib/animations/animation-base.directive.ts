import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AnimationService } from '../services';
import { GestureType } from '../services/gesture-util';
import { TransformParts } from '../services/transform-util';

@Directive()
export abstract class BaseAnimationDirective implements OnInit, OnDestroy {
  @Input() gestureType?: GestureType;
  @Input() gestureEvents?: string[];
  @Input() gestureOptions?: any;

  constructor(
    protected el: ElementRef<HTMLElement>,
    protected animationService: AnimationService
  ) {}

  ngOnInit(): void {
    const hasGestureBinding =
      !!this.gestureType && !!this.gestureEvents?.length;
    if (hasGestureBinding) {
      this.animationService.applyGestureTransform(
        this.el,
        this.gestureType!,
        this.gestureEvents!,
        (ev) => this.mapGestureToParts(ev),
        this.gestureOptions
      );
    } else {
      const staticPayload = this.getStaticParts();
      if (staticPayload) {
        this.animationService.applyTransform(this.el, staticPayload);
      }
    }
  }

  ngOnDestroy(): void {
    this.animationService.clear(this.el);
  }

  /**
   * Map incoming gesture payload to TransformParts or CSS props.
   * Return `null` to ignore the event.
   */
  protected abstract mapGestureToParts(
    ev: any
  ): Partial<TransformParts> | Partial<CSSStyleDeclaration> | null;

  /**
   * For non-gesture (static) usage; return a TransformParts or CSS props to apply at init.
   */
  protected abstract getStaticParts():
    | Partial<TransformParts>
    | Partial<CSSStyleDeclaration>
    | null;
}
