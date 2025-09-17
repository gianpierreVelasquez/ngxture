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
  selector: '[ngxsture-tripletap]',
})
export class TripleTapDirective extends BaseGestureDirective implements OnInit {
  @Input() config?: RecognizerOptions;

  @Output() tripletap = new EventEmitter<HammerInput>();

  constructor(el: ElementRef, gestureService: GestureService) {
    super(el, gestureService);
  }

  ngOnInit() {
    this.listen('tripletap', this.tripletap, 'tripletap', this.config);
  }
}
