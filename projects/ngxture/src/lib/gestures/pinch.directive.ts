import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BaseGestureDirective } from './gesture-base.directive';
import { GestureService } from '../services';

@Directive({ selector: '[ngxture-pinch]' })
export class PinchDirective extends BaseGestureDirective implements OnInit {
  @Output() pinchStart = new EventEmitter<any>();
  @Output() pinchMove = new EventEmitter<any>();
  @Output() pinchEnd = new EventEmitter<any>();
  @Output() pinchCancel = new EventEmitter<any>();
  @Output() pinchIn = new EventEmitter<any>();
  @Output() pinchOut = new EventEmitter<any>();

  @Input() options?: Partial<RecognizerOptions>;

  constructor(el: ElementRef<HTMLElement>, gestureService: GestureService) {
    super(el, gestureService);
    this.gestures = ['pinch'];
  }

  ngOnInit(): void {
    const events = [
      'pinchstart',
      'pinchmove',
      'pinchend',
      'pinchcancel',
      'pinchin',
      'pinchout',
    ];

    const options = this.options || this.gestureOptions;

    if (this.onMultiple) {
      this.subscribeMultiple(events, 'pinch', options);
    } else {
      events.forEach((e) =>
        this.subscribeEvent(e, 'pinch', this.options, () => this.getEmitter(e))
      );
    }
  }

  private getEmitter(event: string): EventEmitter<any> | undefined {
    switch (event) {
      case 'pinchstart':
        return this.pinchStart;
      case 'pinchmove':
        return this.pinchMove;
      case 'pinchend':
        return this.pinchEnd;
      default:
        return undefined;
    }
  }
}
