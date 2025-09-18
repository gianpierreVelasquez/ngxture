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

@Directive({ selector: '[ngxsture-press]' })
export class PressDirective extends BaseGestureDirective implements OnInit {
  @Output() press = new EventEmitter<any>();
  @Output() pressUp = new EventEmitter<any>();

  @Input() options?: Partial<RecognizerOptions>;

  constructor(el: ElementRef<HTMLElement>, gestureService: GestureService) {
    super(el, gestureService);
    this.gestures = ['press', 'pressup'];
  }

  ngOnInit(): void {
    const events = ['press', 'pressup'];

    if (this.onMultiple) {
      this.subscribeMultiple(events, 'press', this.options);
    } else {
      events.forEach((e) =>
        this.subscribeEvent(e, 'press', this.options, () => this.getEmitter(e))
      );
    }
  }

  private getEmitter(event: string): EventEmitter<any> | undefined {
    switch (event) {
      case 'press':
        return this.press;
      case 'pressup':
        return this.pressUp;
      default:
        return undefined;
    }
  }
}
