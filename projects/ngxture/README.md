# 🎬 Angular Animations & Gestures Directives Library

A lightweight and modular **Angular directives library** that provides ready-to-use **animations** (fade, scale, rotate, translate, skew, color, bounce) and **gesture directives** (tap, double-tap, press, swipe, pan, pinch, rotate, etc.).

Includes services and base directives for building **gesture-driven animations**.

**Also support Angular 8**
✅ For Angular 8 projects simply import 'hammerjs' in polyfills.ts or main.ts.

**Angular 20+**
✅ fully supported, Vite SSR safe

---

## ✨ Features

- 🚀 Built with **Angular 16 directives**
- 👆 Gesture directives included:
  - `ngxsture-tap`
  - `ngxsture-doubletap`
  - `ngxsture-tripletap`
  - `ngxsture-press`
  - `ngxsture-pressup`
  - `ngxsture-swipe`
  - `ngxsture-pan`
  - `ngxsture-pinch`
  - `ngxsture-rotate`
- 🎭 Animations included:
  - `ngxFade`
  - `ngxScale`
  - `ngxRotation`
  - `ngxTranslate`
  - `ngxSkew`
  - `ngxColor`
  - `ngxBounce`

- ⚡ Optimized build with **ESM output** and tree-shaking support

---

## 📦 Installation

```bash
npm install ngxture
```

---

## 🚀 Usage

### Animations

```html
<!-- Fade -->
<div ngxFade [config]="{ duration: 500, easing: 'ease-in' }">
  I will fade in!
</div>

<!-- Rotate -->
<div ngxRotate [config]="{ degrees: 90, duration: 400 }">
  I will rotate!
</div>

<!-- Bounce -->
<button ngxBounce>
  Bouncy Button
</button>
```

### Gestures

```html
<!-- Tap -->
<div ngxsture-pan (panStart)="onStart($event)">
  Tap me
</div>

<!-- Swipe -->
<div ngxsture-swipe (swipeLeft)="onSwipeLeft($event)">
  Swipe me
</div>
```

### Combine Animations + Gestures

✅ Example usage

```html
<div
  ngxAnimations
  [gestures]="['tap']"
  [sequence]="true"
>
  <div
    ngxScale
    [config]="{ scale: 1.3, duration: 300 }"
  ></div>

  <div
    ngxRotate
    [config]="{ degrees: 45, duration: 400 }"
  ></div>

  <div
    ngxFade
    [config]="{ opacity: 0.5, duration: 500 }"
  ></div>
</div>
```
👉 With this setup:
-> Each directive owns its animation logic.
-> AnimationService coordinates play/sequence.

---

🤝 Contributing

Contributions are welcome!
Please open an issue [GitHub Issue](https://github.com/gianpierreVelasquez/ngxture/issues) or PR on [GitHub PR](https://github.com/gianpierreVelasquez/ngxture/pulls)
