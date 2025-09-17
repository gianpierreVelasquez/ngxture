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
  @Input() config?: RecognizerOptions;

  @Output() rotateStart = new EventEmitter<HammerInput>();
  @Output() rotateMove = new EventEmitter<HammerInput>();
  @Output() rotateEnd = new EventEmitter<HammerInput>();

  constructor(el: ElementRef, gestureService: GestureService) {
    super(el, gestureService);
  }

  ngOnInit() {
    this.listen('rotatestart', this.rotateStart, 'rotate', this.config);
    this.listen('rotatemove', this.rotateMove, 'rotate', this.config);
    this.listen('rotateend', this.rotateEnd, 'rotate', this.config);
  }
}
