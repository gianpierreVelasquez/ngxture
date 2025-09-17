import { Directive, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GestureService } from '../services/gesture.service';
import { GestureType } from '../services/gesture-util';

@Directive()
export abstract class BaseGestureDirective implements OnDestroy {
  private subs: Subscription[] = [];

  constructor(
    protected el: ElementRef,
    protected gestureService: GestureService
  ) {}

  protected listen(
    event: string,
    emitter: EventEmitter<HammerInput>,
    type: GestureType,
    config: RecognizerOptions
  ) {
    const sub = this.gestureService
      .on(event, this.el.nativeElement, type, config)
      .subscribe((e) => emitter.emit(e));
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
