import {
  Directive,
  EventEmitter,
  Output,
  Input,
  OnInit,
  ElementRef,
} from '@angular/core';
import { GestureService } from '../services/gesture.service';
import { BaseGestureDirective } from './gesture-base.directive';

@Directive({ selector: '[ngxture-pan]' })
export class PanDirective extends BaseGestureDirective implements OnInit {
  @Output() panStart = new EventEmitter<any>();
  @Output() panMove = new EventEmitter<any>();
  @Output() panEnd = new EventEmitter<any>();
  @Output() panUp = new EventEmitter<any>();
  @Output() panDown = new EventEmitter<any>();
  @Output() panLeft = new EventEmitter<any>();
  @Output() panRight = new EventEmitter<any>();
  @Output() panCancel = new EventEmitter<any>();

  @Input() options?: Partial<RecognizerOptions>;

  constructor(el: ElementRef<HTMLElement>, gestureService: GestureService) {
    super(el, gestureService);
    this.gestures = ['pan'];
  }

  ngOnInit(): void {
    const events = [
      'panstart',
      'panmove',
      'panend',
      'panup',
      'pandown',
      'panleft',
      'panright',
      'pancancel',
    ];

    if (this.onMultiple) {
      this.subscribeMultiple(events, 'pan', this.options);
    } else {
      events.forEach((event) =>
        this.subscribeEvent(event, 'pan', this.options, () =>
          this.getEmitter(event)
        )
      );
    }
  }

  private getEmitter(event: string): EventEmitter<any> | undefined {
    switch (event) {
      case 'panstart':
        return this.panStart;
      case 'panmove':
        return this.panMove;
      case 'panend':
        return this.panEnd;
      case 'panup':
        return this.panUp;
      case 'pandown':
        return this.panDown;
      case 'panleft':
        return this.panLeft;
      case 'panright':
        return this.panRight;
      case 'pancancel':
        return this.panCancel;
      default:
        return undefined;
    }
  }
}
