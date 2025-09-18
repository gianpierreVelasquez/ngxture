import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GestureService } from '../services/gesture.service';
import { GestureType } from '../services/gesture-util';

@Directive()
export abstract class BaseGestureDirective implements OnDestroy {
  @Input() gestures: GestureType[] = [];
  @Input() gestureOptions?: RecognizerOptions;
  @Input() onMultiple?: (gesture: string, event: any) => void;

  protected subscriptions: Subscription[] = [];

  constructor(
    protected el: ElementRef<HTMLElement>,
    protected gestureService: GestureService
  ) {}

  protected subscribeEvent(
    event: string,
    type: GestureType,
    config: Partial<RecognizerOptions>,
    getEmitterFn: () => EventEmitter<any> | undefined
  ) {
    const emitter = getEmitterFn();
    if (!emitter) return;
    const cfg = config || this.gestureOptions;
    const sub = this.gestureService
      .on(event, this.el.nativeElement, type, cfg)
      .subscribe((ev) => {
        emitter.emit(ev);
        this.onMultiple?.(event, ev);
      });
    this.subscriptions.push(sub);
  }

  protected subscribeMultiple(
    events: string[],
    type: GestureType,
    config: Partial<RecognizerOptions>
  ) {
    const cfg = config || this.gestureOptions;
    const sub = this.gestureService
      .onMultiple(events, this.el, type, cfg)
      .subscribe(({ event, payload }) => this.onMultiple?.(event, payload));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
