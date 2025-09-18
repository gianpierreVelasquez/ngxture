import { Injectable } from '@angular/core';
import {
  DEFAULT_ANIM,
  ElementState,
  MergeOptions,
  TransformParts,
} from './transform-util';

@Injectable({ providedIn: 'root' })
export class TransformMergeService {
  private states = new WeakMap<HTMLElement, ElementState>();

  constructor() {}

  /**
   * Merge transform parts without applying them to the element.
   */
  public merge(
    element: HTMLElement,
    payload: Partial<TransformParts> | Partial<CSSStyleDeclaration>
  ): TransformParts {
    const state = this.getState(element);
    const { parts: incomingParts } = this.normalizePayload(payload);

    const merged = this.mergeParts(state.parts, incomingParts);

    return { ...merged };
  }

  /**
   * Merge + apply to element with optional animation.
   */
  public update(
    element: HTMLElement,
    payload: Partial<TransformParts> | Partial<CSSStyleDeclaration>,
    opts?: MergeOptions
  ): void {
    const options = { ...DEFAULT_ANIM, ...(opts || {}) };

    const state = this.getState(element);

    const { parts: incomingParts, otherProps } = this.normalizePayload(payload);

    state.parts = this.mergeParts(state.parts, incomingParts);

    if (incomingParts.raw != null) {
      state.rawOverride = incomingParts.raw || null;
    }

    Object.keys(otherProps).forEach((k) => {
      state.cssProps[k] = otherProps[k];
    });

    this.applyToElement(element, state, options);
  }

  public reset(element: HTMLElement, opts?: MergeOptions): void {
    const state = this.states.get(element);
    if (!state) return;

    state.currentAnimation?.cancel();
    state.currentAnimation = null;

    this.states.delete(element);

    if (opts?.animate) {
      element.animate(
        [
          {
            transform: element.style.transform || 'none',
            opacity: element.style.opacity || '1',
          },
          { transform: 'none', opacity: '1' },
        ],
        {
          duration: opts.duration ?? DEFAULT_ANIM.duration,
          easing: opts.easing ?? DEFAULT_ANIM.easing,
          fill: opts.fill ?? DEFAULT_ANIM.fill,
          delay: opts.delay ?? DEFAULT_ANIM.delay,
        }
      ).onfinish = () => {
        element.style.transform = '';
        element.style.opacity = '';
      };
    } else {
      element.style.transform = '';
      element.style.opacity = '';
      Object.keys(state.cssProps).forEach((k) => {
        (element.style as any)[k] = '';
      });
    }
  }

  public getTransformString(element: HTMLElement): string {
    const state = this.states.get(element);
    return state?.rawOverride ?? this.buildTransformString(state?.parts ?? {});
  }

  public getParts(element: HTMLElement): TransformParts | null {
    const state = this.states.get(element);
    return state ? { ...state.parts } : null;
  }

  // ------------------------
  // Internal helpers
  // ------------------------

  private getState(element: HTMLElement): ElementState {
    let state = this.states.get(element);
    if (!state) {
      state = {
        parts: {},
        cssProps: {},
        rawOverride: null,
        currentAnimation: null,
      };
      this.states.set(element, state);
    }
    return state;
  }

  private normalizePayload(
    payload: Partial<TransformParts> | Partial<CSSStyleDeclaration>
  ) {
    const parts: TransformParts = {};
    const otherProps: Record<string, string> = {};
    const p = payload as Partial<CSSStyleDeclaration>;

    if (p.transform) {
      const parsed = this.parseTransformString(p.transform);
      if (parsed) {
        Object.assign(parts, parsed);
      } else {
        parts.raw = p.transform;
      }
    }

    const tp = payload as Partial<TransformParts>;
    (
      [
        'translateX',
        'translateY',
        'translateZ',
        'scale',
        'scaleX',
        'scaleY',
        'rotate',
        'skewX',
        'skewY',
        'raw',
      ] as Array<keyof TransformParts>
    ).forEach((k) => {
      if (tp[k] !== undefined) {
        (parts as any)[k] = tp[k];
      }
    });

    Object.keys(payload).forEach((key) => {
      if (key === 'transform') return;
      if ((parts as any)[key as any] !== undefined) return;
      const val = (payload as any)[key];
      if (typeof val === 'string' || typeof val === 'number') {
        otherProps[key] = String(val);
      }
    });

    return { parts, otherProps };
  }

  private mergeParts(
    base: TransformParts,
    incoming: TransformParts
  ): TransformParts {
    return {
      translateX: incoming.translateX ?? base.translateX,
      translateY: incoming.translateY ?? base.translateY,
      translateZ: incoming.translateZ ?? base.translateZ,
      scale: incoming.scale ?? base.scale,
      scaleX: incoming.scaleX ?? base.scaleX,
      scaleY: incoming.scaleY ?? base.scaleY,
      rotate: incoming.rotate ?? base.rotate,
      skewX: incoming.skewX ?? base.skewX,
      skewY: incoming.skewY ?? base.skewY,
      raw: incoming.raw ?? base.raw,
    };
  }

  private applyToElement(
    element: HTMLElement,
    state: ElementState,
    options: MergeOptions
  ) {
    state.currentAnimation?.cancel();
    state.currentAnimation = null;

    const transformString =
      state.rawOverride ?? this.buildTransformString(state.parts);

    Object.keys(state.cssProps).forEach((k) => {
      (element.style as any)[k] = state.cssProps[k] ?? '';
    });

    if (options.animate) {
      const from = getComputedStyle(element).transform || 'none';
      const to = transformString || 'none';

      try {
        const anim = element.animate(
          [
            { transform: from, offset: 0 },
            { transform: to, offset: 1 },
          ],
          {
            duration: options.duration ?? DEFAULT_ANIM.duration,
            easing: options.easing ?? DEFAULT_ANIM.easing,
            delay: options.delay ?? DEFAULT_ANIM.delay,
            fill: options.fill ?? DEFAULT_ANIM.fill,
          }
        );

        state.currentAnimation = anim;
        anim.onfinish = () => {
          state.currentAnimation = null;
          element.style.transform = to;
        };
        anim.oncancel = () => {
          state.currentAnimation = null;
        };
      } catch {
        element.style.transition = `transform ${
          options.duration ?? DEFAULT_ANIM.duration
        }ms ${options.easing ?? DEFAULT_ANIM.easing}`;
        element.style.transform = transformString;
        window.setTimeout(() => {
          element.style.transition = '';
        }, options.duration ?? DEFAULT_ANIM.duration);
      }
    } else {
      element.style.transform = transformString;
    }
  }

  private buildTransformString(parts: TransformParts): string {
    if (parts.raw) return parts.raw;

    const tokens: string[] = [];

    const tx = parts.translateX ?? 0;
    const ty = parts.translateY ?? 0;
    if (typeof parts.translateZ === 'string') {
      tokens.push(`translate3d(${tx}px, ${ty}px, ${parts.translateZ})`);
    } else {
      if (tx !== 0 || ty !== 0) tokens.push(`translate(${tx}px, ${ty}px)`);
    }

    if (typeof parts.rotate === 'number' && parts.rotate !== 0) {
      tokens.push(`rotate(${parts.rotate}deg)`);
    }

    if (typeof parts.skewX === 'number' && parts.skewX !== 0) {
      tokens.push(`skewX(${parts.skewX}deg)`);
    }
    if (typeof parts.skewY === 'number' && parts.skewY !== 0) {
      tokens.push(`skewY(${parts.skewY}deg)`);
    }

    if (typeof parts.scale === 'number') {
      tokens.push(`scale(${parts.scale})`);
    } else {
      if (
        typeof parts.scaleX === 'number' ||
        typeof parts.scaleY === 'number'
      ) {
        const sx = parts.scaleX ?? 1;
        const sy = parts.scaleY ?? 1;
        tokens.push(`scale(${sx}, ${sy})`);
      }
    }

    if (tokens.length === 0) return '';

    return tokens.join(' ');
  }

  private parseTransformString(input: string): TransformParts | null {
    if (!input || input === 'none')
      return { translateX: 0, translateY: 0, scale: 1, rotate: 0 };

    const parts: TransformParts = {};

    const translate3d =
      /translate3d\(\s*([^\s,]+)[^\d]*,\s*([^\s,]+)[^\d]*,\s*([^\)]+)\)/i.exec(
        input
      );
    if (translate3d) {
      parts.translateX = this.parsePx(translate3d[1]);
      parts.translateY = this.parsePx(translate3d[2]);
      parts.translateZ = translate3d[3].trim();
    }

    const translate = /translate\(\s*([^\s,]+)[^\d]*,\s*([^\)]+)\)/i.exec(
      input
    );
    if (translate && !translate3d) {
      parts.translateX = this.parsePx(translate[1]);
      parts.translateY = this.parsePx(translate[2]);
    }

    const rotate = /rotate\(\s*([^\)]+)deg\s*\)/i.exec(input);
    if (rotate) {
      parts.rotate = parseFloat(rotate[1]);
    }

    const skewX = /skewX\(\s*([^\)]+)deg\s*\)/i.exec(input);
    if (skewX) parts.skewX = parseFloat(skewX[1]);
    const skewY = /skewY\(\s*([^\)]+)deg\s*\)/i.exec(input);
    if (skewY) parts.skewY = parseFloat(skewY[1]);

    const scale2 = /scale\(\s*([^\s,]+)\s*,\s*([^\)]+)\)/i.exec(input);
    if (scale2) {
      parts.scaleX = parseFloat(scale2[1]);
      parts.scaleY = parseFloat(scale2[2]);
    } else {
      const scale1 = /scale\(\s*([^\)]+)\)/i.exec(input);
      if (scale1) {
        parts.scale = parseFloat(scale1[1]);
      }
    }

    const anyFound = Object.keys(parts).length > 0;
    return anyFound ? parts : null;
  }

  private parsePx(token: string): number {
    if (token.endsWith('px')) return parseFloat(token.replace('px', ''));
    if (token.endsWith('%')) {
      return parseFloat(token.replace('%', ''));
    }
    return parseFloat(token);
  }
}
