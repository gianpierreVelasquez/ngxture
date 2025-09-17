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
  selector: '[ngxsture-press]',
})
export class PressDirective extends BaseGestureDirective implements OnInit {
  @Input() config?: RecognizerOptions;

  @Output() press = new EventEmitter<HammerInput>();

  constructor(el: ElementRef, gestureService: GestureService) {
    super(el, gestureService);
  }

  ngOnInit() {
    this.listen('press', this.press, 'press', this.config);
  }
}
