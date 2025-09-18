import { Injectable, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GestureService } from './gesture.service';
import { TransformMergeService } from './transform.service';
import { TransformParts } from './transform-util';
import { GestureType } from './gesture-util';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private subscriptions = new WeakMap<HTMLElement, Subscription[]>();

  constructor(
    private gestureService: GestureService,
    private transformMerge: TransformMergeService
  ) {}

  public applyTransform(
    element: HTMLElement | ElementRef<HTMLElement>,
    payload: Partial<TransformParts> | Partial<CSSStyleDeclaration>,
    opts?: {
      animate?: boolean;
      duration?: number;
      easing?: string;
      delay?: number;
    }
  ): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;
    this.transformMerge.update(el, payload, opts);
  }

  public applyGestureTransform(
    element: HTMLElement | ElementRef<HTMLElement>,
    gestureType: GestureType,
    events: string[],
    transformerFn: (
      ev: any
    ) => Partial<TransformParts> | Partial<CSSStyleDeclaration> | null,
    options?: any
  ): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;
    const sub = this.gestureService
      .onMultiple(events, el, gestureType, options)
      .subscribe(({ event, payload }) => {
        const result = transformerFn(payload);
        if (result) {
          this.transformMerge.update(el, result);
        }
      });

    const arr = this.subscriptions.get(el) ?? [];
    arr.push(sub);
    this.subscriptions.set(el, arr);
  }

  public clear(element: HTMLElement | ElementRef<HTMLElement>): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;
    const subs = this.subscriptions.get(el);

    if (subs) {
      subs.forEach((s) => s.unsubscribe());
      this.subscriptions.delete(el);
    }

    this.transformMerge.reset(el);
  }
}
