import {
  Component,
  HostListener,
  Input,
  ViewChild,
  __decorate,
  init_core,
  init_esm,
  init_tslib_es6,
  interval
} from "./chunk-Q65QT37U.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/carousel/carousel.component.html
var carousel_component_default;
var init_carousel_component = __esm({
  "angular:jit:template:src/app/carousel/carousel.component.html"() {
    carousel_component_default = `<div class="main-container">
  <div class="container">
    <div
      class="carousel"
      [style.--ancho-slide]="anchoSlide"
      role="region"
      aria-roledescription="carousel"
    >
      <div
        class="slides"
        #slideContainer
        [style.transform]="translateX"
        [style.transition]="isDragging ? 'transform' : 'transform .5s ease'"
      >
        @for (img of images; track $index) {
          <img class="slide" [src]="img" alt="Carousel image" />
        }
      </div>
    </div>
  </div>
</div>
`;
  }
});

// angular:jit:style:src/app/carousel/carousel.component.scss
var carousel_component_default2;
var init_carousel_component2 = __esm({
  "angular:jit:style:src/app/carousel/carousel.component.scss"() {
    carousel_component_default2 = "/* src/app/carousel/carousel.component.scss */\n.carousel {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.carousel .slides {\n  display: flex;\n}\n.carousel .slides > .slide {\n  width: var(--ancho-slide);\n  object-fit: cover;\n  height: auto;\n  box-sizing: border-box;\n  background-color: #fff;\n  border: 1px solid #fff;\n}\n.container {\n  border: 1px solid black;\n  width: 90%;\n}\n.main-container {\n  display: flex;\n  justify-content: center;\n}\n/*# sourceMappingURL=carousel.component.css.map */\n";
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
      images = [];
      /** How many slides are visible at once */
      slidesToShow = 1;
      anchoSlide = "100%";
      /** Current start index (0‑based) of the viewport */
      currentIndex = 0;
      /* ---- private helpers ------------------------------------------------- */
      autoPlay$;
      // Auto‑slide timer
      slideContainer;
      isDragging = false;
      dragTranslatePct;
      dragStartX = 0;
      // X position when dragging starts
      /** Width of a single slide in % (e.g. 33.333% for 3 slides) */
      get slideWidthPercent() {
        return 100 / this.slidesToShow;
      }
      /** CSS transform applied to the slides container */
      get translateX() {
        const pct = -this.currentIndex * this.slideWidthPercent;
        if (this.isDragging && this.dragTranslatePct !== void 0) {
          return `translateX(${pct + this.dragTranslatePct}%)`;
        }
        return `translateX(${pct}%)`;
      }
      /* ---- life‑cycle ----------------------------------------------------- */
      ngOnInit() {
        this.updateSlidesToShow();
        this.startAutoPlay();
      }
      ngOnDestroy() {
        this.autoPlay$?.unsubscribe();
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
          this.anchoSlide = "33%";
        } else if (width >= 640) {
          this.slidesToShow = Math.min(2, this.images.length);
          this.anchoSlide = "50%";
        } else {
          this.slidesToShow = 1;
          this.anchoSlide = "100%";
        }
      }
      onPointerDown(e) {
        e.preventDefault();
        this.pauseAutoPlay();
        this.isDragging = true;
        this.dragStartX = e.clientX;
      }
      onPointerUp(e) {
        const delta = e.clientX - this.dragStartX;
        const containerWidth = this.slideContainer?.nativeElement.offsetWidth || 1;
        const slidePx = containerWidth / this.slidesToShow;
        if (delta > slidePx / 2) {
          this.prev();
        } else if (delta < -slidePx / 2) {
          this.next();
        }
        this.resumeAutoPlay();
        this.isDragging = false;
        this.dragTranslatePct = void 0;
      }
      onPointerMove(e) {
        if (!this.isDragging)
          return;
        const delta = e.clientX - this.dragStartX;
        const containerWidth = this.slideContainer?.nativeElement.offsetWidth || 1;
        const pctOffset = delta / containerWidth * 100;
        this.dragTranslatePct = pctOffset;
      }
      onPointerLeave(e) {
        this.dragStartX = 0;
        this.isDragging = false;
        this.resumeAutoPlay();
      }
      static propDecorators = {
        images: [{ type: Input }],
        slideContainer: [{ type: ViewChild, args: ["slideContainer"] }],
        onPointerDown: [{ type: HostListener, args: ["pointerdown", ["$event"]] }],
        onPointerUp: [{ type: HostListener, args: ["pointerup", ["$event"]] }],
        onPointerMove: [{ type: HostListener, args: ["pointermove", ["$event"]] }],
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
//# sourceMappingURL=chunk-3CYNKYII.js.map
