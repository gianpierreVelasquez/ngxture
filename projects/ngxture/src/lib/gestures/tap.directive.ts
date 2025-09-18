import {
  Directive,
  EventEmitter,
  Output,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { BaseGestureDirective } from './gesture-base.directive';
import { GestureService } from '../services/gesture.service';

@Directive({ selector: '[ngxture-tap]' })
export class TapDirective extends BaseGestureDirective implements OnInit {
  @Output() tap = new EventEmitter<any>();
  @Output() doubleTap = new EventEmitter<any>();
  @Output() tripleTap = new EventEmitter<any>();

  @Input() options?: Partial<RecognizerOptions>;

  constructor(el: ElementRef<HTMLElement>, gestureService: GestureService) {
    super(el, gestureService);
    this.gestures = ['tap', 'doubletap', 'tripletap'];
  }

  ngOnInit(): void {
    const events = ['tap', 'doubletap', 'tripletap'];

    if (this.onMultiple) {
      this.subscribeMultiple(events, 'tap', this.options);
    } else {
      events.forEach(e => this.subscribeEvent(e, 'tap', this.options, () => this.getEmitter(e)));
    }
  }

  private getEmitter(event: string): EventEmitter<any> | undefined {
    switch (event) {
      case 'tap': return this.tap;
      case 'doubletap': return this.doubleTap;
      case 'tripletap': return this.tripleTap;
      default: return undefined;
    }
  }
}
