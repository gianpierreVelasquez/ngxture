import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TransformMergeService {
  private transforms = new WeakMap<HTMLElement, Record<string, string>>();

  setTransform(el: HTMLElement, key: string, value: string): string {
    let record = this.transforms.get(el);
    if (!record) {
      record = {};
      this.transforms.set(el, record);
    }
    record[key] = value;
    const transformStr = Object.values(record).join(' ').trim();
    el.style.transform = transformStr;
    return transformStr;
  }

  getTransformString(el: HTMLElement): string {
    const record = this.transforms.get(el);
    if (!record) return '';
    return Object.values(record).join(' ').trim();
  }

  removeTransformKey(el: HTMLElement, key: string) {
    const record = this.transforms.get(el);
    if (!record) return;
    delete record[key];
    const transformStr = Object.values(record).join(' ').trim();
    el.style.transform = transformStr;
  }

  clearTransforms(el: HTMLElement) {
    this.transforms.delete(el);
    el.style.transform = '';
  }
}
