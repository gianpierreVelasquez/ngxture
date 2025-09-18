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

@Directive({ selector: '[ngxsture-swipe]' })
export class SwipeDirective extends BaseGestureDirective implements OnInit {
  @Output() swipe = new EventEmitter<any>();
  @Output() swipeLeft = new EventEmitter<any>();
  @Output() swipeRight = new EventEmitter<any>();
  @Output() swipeUp = new EventEmitter<any>();
  @Output() swipeDown = new EventEmitter<any>();

  @Input() options?: Partial<RecognizerOptions>;

  constructor(el: ElementRef<HTMLElement>, gestureService: GestureService) {
    super(el, gestureService);
    this.gestures = ['swipe'];
  }

  ngOnInit(): void {
    const events = ['swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown'];
    if (this.onMultiple) {
      this.subscribeMultiple(events, 'swipe', this.options);
    } else {
      events.forEach((e) =>
        this.subscribeEvent(e, 'swipe', this.options, () => this.getEmitter(e))
      );
    }
  }

  private getEmitter(event: string): EventEmitter<any> | undefined {
    switch (event) {
      case 'swipe':
        return this.swipe;
      case 'swipeleft':
        return this.swipeLeft;
      case 'swiperight':
        return this.swipeRight;
      case 'swipeup':
        return this.swipeUp;
      case 'swipedown':
        return this.swipeDown;
      default:
        return undefined;
    }
  }
}
