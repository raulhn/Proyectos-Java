import {
  Component,
  HostListener,
  Input,
  __decorate,
  fromEvent,
  init_core,
  init_esm,
  init_tslib_es6,
  interval
} from "./chunk-IXAXC6BC.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/carousel/carousel.component.html
var carousel_component_default;
var init_carousel_component = __esm({
  "angular:jit:template:src/app/carousel/carousel.component.html"() {
    carousel_component_default = `<div class="carousel" [style.--slides-to-show]="slidesToShow" role="region" aria-roledescription="carousel">
  <div
    class="slides"
    [style.transform]="translateX"
    [style.transition]="'transform .5s ease'"
  >
    @for (img of images; track img) {
      <img class="slide" [src]="img" alt="Carousel image" />
    }
  </div>
</div>`;
  }
});

// angular:jit:style:src/app/carousel/carousel.component.scss
var carousel_component_default2;
var init_carousel_component2 = __esm({
  "angular:jit:style:src/app/carousel/carousel.component.scss"() {
    carousel_component_default2 = "/* src/app/carousel/carousel.component.scss */\n.carousel {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.carousel .slides {\n  display: flex;\n}\n.carousel .slides > .slide {\n  flex: 0 0 calc(100% / var(--slides-to-show));\n  object-fit: cover;\n  height: auto;\n  box-sizing: border-box;\n  background-color: #fff;\n  border: 1px solid #fff;\n}\n/*# sourceMappingURL=carousel.component.css.map */\n";
  }
});

// src/app/carousel/carousel.component.ts
var CarouselComponent;
var init_carousel_component3 = __esm({
  "src/app/carousel/carousel.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_carousel_component();
    init_carousel_component2();
    init_core();
    init_esm();
    CarouselComponent = class CarouselComponent2 {
      images = [
        // Default placeholder images
        "https://picsum.photos/id/1015/800/500",
        "https://picsum.photos/id/1020/800/500",
        "https://picsum.photos/id/1024/800/500",
        "https://picsum.photos/id/1033/800/500",
        "https://picsum.photos/id/1049/800/500"
      ];
      /** How many slides are visible at once */
      slidesToShow = 1;
      /** Current start index (0‑based) of the viewport */
      currentIndex = 0;
      /* ---- private helpers ------------------------------------------------- */
      autoPlay$;
      // Auto‑slide timer
      resize$;
      // Window resize listener
      dragStartX = 0;
      // X position when dragging starts
      /** Width of a single slide in % (e.g. 33.333% for 3 slides) */
      get slideWidthPercent() {
        return 100 / this.slidesToShow;
      }
      /** CSS transform applied to the slides container */
      get translateX() {
        const pct = -this.currentIndex * this.slideWidthPercent;
        return `translateX(${pct}%)`;
      }
      /* ---- life‑cycle ----------------------------------------------------- */
      ngOnInit() {
        this.updateSlidesToShow();
        this.startAutoPlay();
        this.resize$ = fromEvent(window, "resize").subscribe(() => this.updateSlidesToShow());
      }
      ngOnDestroy() {
        this.autoPlay$?.unsubscribe();
        this.resize$?.unsubscribe();
      }
      /* ---- auto‑play ------------------------------------------------------- */
      startAutoPlay() {
        this.autoPlay$ = interval(3e3).subscribe(() => this.next());
      }
      pauseAutoPlay() {
        this.autoPlay$?.unsubscribe();
        this.autoPlay$ = void 0;
      }
      resumeAutoPlay() {
        if (!this.autoPlay$) {
          this.startAutoPlay();
        }
      }
      /* ---- navigation helpers ---------------------------------------------- */
      next() {
        if (this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      }
      prev() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.images.length - 1;
        }
      }
      /* ---- responsive logic ------------------------------------------------ */
      updateSlidesToShow() {
        const width = window.innerWidth;
        if (width >= 1024) {
          this.slidesToShow = Math.min(3, this.images.length);
        } else if (width >= 640) {
          this.slidesToShow = Math.min(2, this.images.length);
        } else {
          this.slidesToShow = 1;
        }
      }
      onPointerDown(e) {
        e.preventDefault();
        this.pauseAutoPlay();
        this.dragStartX = e.clientX;
      }
      onPointerUp(e) {
        const delta = e.clientX - this.dragStartX;
        const threshold = 50;
        if (delta > threshold) {
          this.prev();
        } else if (delta < -threshold) {
          this.next();
        }
        this.resumeAutoPlay();
      }
      onPointerLeave(e) {
        this.dragStartX = 0;
      }
      static propDecorators = {
        images: [{ type: Input }],
        onPointerDown: [{ type: HostListener, args: ["pointerdown", ["$event"]] }],
        onPointerUp: [{ type: HostListener, args: ["pointerup", ["$event"]] }],
        onPointerLeave: [{ type: HostListener, args: ["pointerleave", ["$event"]] }]
      };
    };
    CarouselComponent = __decorate([
      Component({
        selector: "app-carousel",
        template: carousel_component_default,
        styles: [carousel_component_default2]
      })
    ], CarouselComponent);
  }
});

export {
  CarouselComponent,
  init_carousel_component3 as init_carousel_component
};
//# sourceMappingURL=chunk-OR7WJMJM.js.map
