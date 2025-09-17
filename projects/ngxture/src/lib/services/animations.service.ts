import { Injectable, ElementRef } from '@angular/core';
import { GestureService } from './gesture.service';
import { BaseAnimationDirective } from '../animations';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  constructor(private gestureService: GestureService) {}

  bindGesturesToDirective(
    elRef: ElementRef<HTMLElement>,
    gestures: string[] | undefined,
    directive: BaseAnimationDirective
  ) {
    const gestureList = gestures && gestures.length ? gestures : ['tap'];
    gestureList.forEach((g) => {
      const sub = this.gestureService
        .on(g, elRef.nativeElement, g as any)
        .subscribe(() => {
          directive.playAnimation();
        });
    });
  }
}
