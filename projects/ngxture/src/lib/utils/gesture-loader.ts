export type HammerConstructor = new (
  el: HTMLElement | SVGElement,
  opts?: any
) => any;

let hammerBuilder: HammerConstructor | null = null;

export async function loadHammer(): Promise<HammerConstructor> {
  if (hammerBuilder) return hammerBuilder;

  if (typeof window === 'undefined' || typeof window === undefined) {
    throw new Error(
      '[Ngxture] HammerJS can only be loaded in a browser environment (SSR detected).'
    );
  }

  try {
    const mod: any = await import('hammerjs');
    hammerBuilder = (mod.default || mod) as HammerConstructor;

    return hammerBuilder;
  } catch (err) {
    throw new Error(
      '[Ngxture] Failed to dynamically import hammerjs. ' +
        'Make sure hammerjs is installed. ' +
        "If you target Angular 8 or older bundlers, import 'hammerjs' manually in polyfills.ts."
    );
  }
}
