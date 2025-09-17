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
  selector: '[ngxsture-pressup]',
})
export class PressUpDirective extends BaseGestureDirective implements OnInit {
  @Input() config?: RecognizerOptions;

  @Output() pressUp = new EventEmitter<HammerInput>();

  constructor(el: ElementRef, gestureService: GestureService) {
    super(el, gestureService);
  }

  ngOnInit() {
    this.listen('pressup', this.pressUp, 'pressup', this.config);
  }
}
