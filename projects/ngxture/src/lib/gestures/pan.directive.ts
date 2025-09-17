import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BaseGestureDirective } from './gesture-base.directive';
import { GestureService } from '../services/gesture.service';

@Directive({
  selector: '[ngxsture-pan]',
})
export class PanDirective extends BaseGestureDirective implements OnInit {
  @Input() config?: RecognizerOptions;

  @Output() panStart = new EventEmitter<HammerInput>();
  @Output() panMove = new EventEmitter<HammerInput>();
  @Output() panEnd = new EventEmitter<HammerInput>();
  @Output() panCancel = new EventEmitter<HammerInput>();
  @Output() panLeft = new EventEmitter<HammerInput>();
  @Output() panRight = new EventEmitter<HammerInput>();
  @Output() panUp = new EventEmitter<HammerInput>();
  @Output() panDown = new EventEmitter<HammerInput>();

  constructor(el: ElementRef, gestureService: GestureService) {
    super(el, gestureService);
  }

  // Available Methods
  // panstart, panmove, panend, pancancel, panleft, panright, panup, pandown
  ngOnInit() {
    this.listen('panstart', this.panStart, 'pan', this.config);
    this.listen('panmove', this.panMove, 'pan', this.config);
    this.listen('panend', this.panEnd, 'pan', this.config);
    this.listen('pancancel', this.panCancel, 'pan', this.config);
    this.listen('panleft', this.panLeft, 'pan', this.config);
    this.listen('panright', this.panRight, 'pan', this.config);
    this.listen('panup', this.panUp, 'pan', this.config);
    this.listen('pandown', this.panDown, 'pan', this.config);
  }
}
