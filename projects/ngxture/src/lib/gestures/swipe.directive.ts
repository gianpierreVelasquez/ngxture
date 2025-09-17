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

@Directive({
  selector: '[ngxsture-swipe]',
})
export class SwipeDirective extends BaseGestureDirective implements OnInit {
  @Input() config?: RecognizerOptions;

  @Output() swipe = new EventEmitter<HammerInput>();
  @Output() swipeLeft = new EventEmitter<HammerInput>();
  @Output() swipeRight = new EventEmitter<HammerInput>();
  @Output() swipeUp = new EventEmitter<HammerInput>();
  @Output() swipeDown = new EventEmitter<HammerInput>();

  constructor(el: ElementRef, gestureService: GestureService) {
    super(el, gestureService);
  }

  // Available Methods
  // swipeleft, swiperight, swipeup, swipedown
  ngOnInit() {
    this.listen('swipe', this.swipe, 'swipe', this.config);
    this.listen('swipeleft', this.swipeLeft, 'swipe', this.config);
    this.listen('swiperight', this.swipeRight, 'swipe', this.config);
    this.listen('swipeup', this.swipeUp, 'swipe', this.config);
    this.listen('swipedown', this.swipeDown, 'swipe', this.config);
  }
}
