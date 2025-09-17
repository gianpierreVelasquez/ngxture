import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import {
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  animate,
  style,
  keyframes,
} from '@angular/animations';
import { BaseAnimationConfig } from '../services/animation-util';
import { TransformMergeService } from '../services/transform.service';

@Directive()
export abstract class BaseAnimationDirective<
  T extends BaseAnimationConfig = BaseAnimationConfig
> implements OnDestroy
{
  @Input() config!: T;

  protected player?: AnimationPlayer;

  constructor(
    protected el: ElementRef<HTMLElement>,
    protected builder: AnimationBuilder,
    protected transformMerge: TransformMergeService
  ) {}

  protected abstract buildFactory(config: T): AnimationFactory;

  async playAnimation(): Promise<void> {
    if (!this.config) return;

    if (this.config.delay && this.config.delay > 0) {
      await new Promise((r) => setTimeout(r, this.config.delay));
    }

    const factory = this.buildFactory(this.config);
    this.player = factory.create(this.el.nativeElement);
    return new Promise<void>((resolve) => {
      this.player!.onDone(() => {
        try {
          this.player!.destroy();
        } catch {}
        resolve();
      });
      this.player!.init();
      this.player!.play();
    });
  }

  protected animateToStyle(
    duration = 300,
    easing = 'ease-in-out',
    styles: Record<string, any>
  ): AnimationFactory {
    return this.builder.build([
      animate(`${duration}ms ${easing}`, style(styles)),
    ]);
  }

  protected animateKeyframes(
    duration = 600,
    easing = 'ease-out',
    frames: any[]
  ): AnimationFactory {
    return this.builder.build([
      animate(`${duration}ms ${easing}`, keyframes(frames)),
    ]);
  }

  ngOnDestroy(): void {
    try {
      this.player?.destroy();
    } catch {}
    this.transformMerge.clearTransforms(this.el.nativeElement);
  }
}
