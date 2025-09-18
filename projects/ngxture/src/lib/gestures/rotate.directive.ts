import {
  Directive,
  EventEmitter,
  Output,
  ElementRef,
  NgZone,
  Input,
} from '@angular/core';
import { BaseGestureDirective } from './gesture-base.directive';
import { GestureService } from '../services/gesture.service';

@Directive({
  selector: '[ngxsture-rotate]',
})
export class RotateDirective extends BaseGestureDirective {
  @Output() rotateStart = new EventEmitter<any>();
  @Output() rotateMove = new EventEmitter<any>();
  @Output() rotateEnd = new EventEmitter<any>();
  @Output() rotateCancel = new EventEmitter<any>();

  @Input() options?: RecognizerOptions;

  constructor(el: ElementRef<HTMLElement>, gestureService: GestureService) {
    super(el, gestureService);
    this.gestures = ['rotate'];
  }

  ngOnInit(): void {
    const events = ['rotatestart', 'rotatemove', 'rotateend', 'rotatecancel'];

    if (this.onMultiple) {
      this.subscribeMultiple(events, 'rotate', this.options);
    } else {
      events.forEach((e) =>
        this.subscribeEvent(e, 'rotate', this.options, () => this.getEmitter(e))
      );
    }
  }

  private getEmitter(event: string): EventEmitter<any> | null {
    switch (event) {
      case 'rotatestart':
        return this.rotateStart;
      case 'rotatemove':
        return this.rotateMove;
      case 'rotateend':
        return this.rotateEnd;
      case 'rotatecancel':
        return this.rotateCancel;
      default:
        return null;
    }
  }
}
