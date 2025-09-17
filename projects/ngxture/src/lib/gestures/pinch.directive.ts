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
  selector: '[ngxsture-pinch]',
})
export class PinchDirective extends BaseGestureDirective implements OnInit {
  @Input() config?: RecognizerOptions;

  @Output() pinchStart = new EventEmitter<HammerInput>();
  @Output() pinchMove = new EventEmitter<HammerInput>();
  @Output() pinchEnd = new EventEmitter<HammerInput>();
  @Output() pinchCancel = new EventEmitter<HammerInput>();
  @Output() pinchIn = new EventEmitter<HammerInput>();
  @Output() pinchOut = new EventEmitter<HammerInput>();

  constructor(el: ElementRef, gestureService: GestureService) {
    super(el, gestureService);
  }

  // Available Methods
  // pinchstart, pinchmove, pinchend, pinchcancel, pinchin, pinchout
  ngOnInit() {
    this.listen('pinchstart', this.pinchStart, 'pinch', this.config);
    this.listen('pinchmove', this.pinchMove, 'pinch', this.config);
    this.listen('pinchend', this.pinchEnd, 'pinch', this.config);
    this.listen('pinchcancel', this.pinchCancel, 'pinch', this.config);
    this.listen('pinchin', this.pinchIn, 'pinch', this.config);
    this.listen('pinchout', this.pinchOut, 'pinch', this.config);
  }
}
