import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { loadHammer, HammerConstructor } from '../utils/gesture-loader';
import { GestureType, defaultGestureConfig } from './gesture-util';

@Injectable({ providedIn: 'root' })
export class GestureService {
  private managers = new WeakMap<HTMLElement, any>();

  private getDefaultOptions(type: GestureType): any {
    const g = defaultGestureConfig.find((x) => x.type === type);
    return g?.options || {};
  }

  private async getManager(element: HTMLElement): Promise<any> {
    if (this.managers.has(element)) {
      return this.managers.get(element);
    }

    const Hammer: HammerConstructor = await loadHammer();
    const manager = new (Hammer as any).Manager(element);
    this.managers.set(element, manager);

    return manager;
  }

  private createRecognizer(Hammer: any, type: GestureType, options: any): any {
    switch (type) {
      case 'pan':
      case 'panstart':
      case 'panmove':
      case 'panend':
      case 'pancancel':
        return new Hammer.Pan(options);

      case 'pinch':
      case 'pinchstart':
      case 'pinchmove':
      case 'pinchend':
      case 'pinchcancel':
        return new Hammer.Pinch(options);

      case 'rotate':
      case 'rotatestart':
      case 'rotatemove':
      case 'rotateend':
      case 'rotatecancel':
        return new Hammer.Rotate(options);

      case 'swipe':
      case 'swipeleft':
      case 'swiperight':
      case 'swipeup':
      case 'swipedown':
        return new Hammer.Swipe(options);

      case 'press':
      case 'pressup':
        return new Hammer.Press(options);

      case 'tap':
      case 'doubletap':
      case 'tripletap':
        return new Hammer.Tap(options);

      default:
        throw new Error(`[Ngxture] Unsupported gesture type: ${type}`);
    }
  }

  private async getRecognizer(
    element: HTMLElement,
    type: GestureType,
    options?: any
  ): Promise<any> {
    const Hammer: any = await loadHammer();
    const manager = await this.getManager(element);

    if (!manager.get(type)) {
      const opts = {
        ...(this.getDefaultOptions(type) || {}),
        ...(options || {}),
      };
      const recognizer = this.createRecognizer(Hammer, type, opts);
      manager.add(recognizer);
    }

    return manager;
  }

  public on(
    event: string,
    element: HTMLElement | ElementRef<HTMLElement>,
    type: GestureType,
    options?: any
  ): Observable<any> {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    return new Observable<any>((subscriber) => {
      let managerRef: any;

      this.getRecognizer(el, type, options)
        .then((manager) => {
          managerRef = manager;
          const handler = (ev: any) => subscriber.next(ev);

          manager.on(event, handler);

          subscriber.add(() => {
            try {
              manager.off(event, handler);
            } catch (e) {
              console.error(`[Ngxture] Failed to detach gesture handler`, e);
            }
          });
        })
        .catch((err) => subscriber.error(err));
    });
  }

  public onMultiple(
    events: string[],
    element: HTMLElement | ElementRef<HTMLElement>,
    type: GestureType,
    options?: any
  ): Observable<{ event: string; payload: any }> {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    return new Observable<{ event: string; payload: any }>((subscriber) => {
      this.getRecognizer(el, type, options)
        .then((manager) => {
          const handlers: Array<{ name: string; fn: any }> = [];

          events.forEach((evt) => {
            const fn = (ev: any) =>
              subscriber.next({ event: evt, payload: ev });
            handlers.push({ name: evt, fn });
            manager.on(evt, fn);
          });

          subscriber.add(() => {
            handlers.forEach((h) => {
              try {
                manager.off(h.name, h.fn);
              } catch (e) {
                console.error(`[Ngxture] Failed to detach gesture handler`, e);
              }
            });
          });
        })
        .catch((err) => subscriber.error(err));
    });
  }

  public destroyManager(element: HTMLElement) {
    const manager = this.managers.get(element);
    if (manager) {
      try {
        manager.destroy();
      } catch (e) {
        console.error(`[Ngxture] Failed to destroy Hammer manager`, e);
      }

      this.managers.delete(element);
    }
  }
}
