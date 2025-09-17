import {
  Directive,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { BaseAnimationDirective } from './animation-base.directive';
import { GestureService } from '../services';

@Directive({
  selector: '[ngxAnimation]',
})
export class AnimationDirective implements AfterContentInit, OnDestroy {
  @Input() gestures: string[] = ['tap'];
  @Input() sequence = false;

  @ContentChildren(BaseAnimationDirective, { descendants: true })
  animations!: QueryList<BaseAnimationDirective>;

  private subs: Subscription[] = [];

  constructor(
    private host: ElementRef,
    private gestureService: GestureService
  ) {}

  ngAfterContentInit(): void {
    if (!this.animations || this.animations.length === 0) return;

    this.gestures.forEach((g) => {
      const sub = this.gestureService
        .on(g, this.host.nativeElement, g as any)
        .subscribe((event) => {
          this.handleGesture(event.type || g);
        });
      this.subs.push(sub);
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    this.subs = [];
  }

  private async handleGesture(_gestureType: string) {
    const arr = this.animations.toArray();
    if (this.sequence) {
      for (const anim of arr) {
        await anim.playAnimation();
      }
    } else {
      arr.forEach((a) => a.playAnimation());
    }
  }
}
