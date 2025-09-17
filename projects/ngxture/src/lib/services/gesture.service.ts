import { Injectable } from '@angular/core';
import { fromEventPattern, merge, Observable } from 'rxjs';
import { GestureConfig, GestureType, defaultConfig } from './gesture-util';
import Hammer from 'hammerjs';

@Injectable({ providedIn: 'root' })
export class GestureService {
  private hammerManagers = new WeakMap<HTMLElement, HammerManager>();

  constructor() {}

  private createRecognizer(
    type: GestureType,
    options?: RecognizerOptions
  ): Recognizer {
    switch (type) {
      case 'pan':
        return new Hammer.Pan(options);
      case 'pinch':
        return new Hammer.Pinch(options);
      case 'press':
        return new Hammer.Press(options);
      case 'pressup':
        return new Hammer.Press(options);
      case 'rotate':
        return new Hammer.Rotate(options);
      case 'swipe':
        return new Hammer.Swipe(options);
      case 'tap':
        return new Hammer.Tap(options);
      case 'doubletap':
        return new Hammer.Tap(options);
      case 'tripletap':
        return new Hammer.Tap(options);
      default:
        throw new Error(`Unknown recognizer: ${type}`);
    }
  }

  private getDefaultOptions(type: GestureType): RecognizerOptions {
    const gesture = defaultConfig.find((g) => g.type === type);

    return gesture?.options || {};
  }

  getManager(
    element: HTMLElement,
    type: GestureType,
    config: RecognizerOptions = {}
  ): HammerManager {
    let manager = this.hammerManagers.get(element);

    if (!manager) {
      manager = new Hammer.Manager(element);
      this.hammerManagers.set(element, manager);
    }

    if (!manager.get(type)) {
      const options = { ...this.getDefaultOptions(type), ...config };
      manager.add(this.createRecognizer(type, options));
    }

    return manager;
  }

  on(
    event: string,
    element: HTMLElement,
    type: GestureType,
    configs?: RecognizerOptions
  ): Observable<HammerInput> {
    const manager = this.getManager(element, type, configs);

    return fromEventPattern<HammerInput>(
      (handler) => manager.on(event, handler),
      (handler) => manager.off(event, handler)
    );
  }

  registerGestures(element: HTMLElement, configs: GestureConfig[]) {
    configs.forEach((cfg) =>
      this.getManager(element, cfg.type, cfg.options || {})
    );
  }

  onMultiple(
    events: { event: string; type: GestureType; config?: RecognizerOptions }[],
    element: HTMLElement
  ) {
    const observables = events.map((e) =>
      this.on(e.event, element, e.type, e.config)
    );
    return observables.length > 0
      ? merge(...observables)
      : new Observable<HammerInput>();
  }
}
