import {
  CarouselComponent,
  init_carousel_component
} from "./chunk-3QIJVQQY.js";
import {
  CommonModule,
  TestBed,
  init_common,
  init_testing
} from "./chunk-IXAXC6BC.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/carousel/carousel.component.spec.ts
var require_carousel_component_spec = __commonJS({
  "src/app/carousel/carousel.component.spec.ts"(exports) {
    init_testing();
    init_carousel_component();
    init_common();
    function createPointerEvent(type, clientX) {
      return new PointerEvent(type, {
        clientX,
        bubbles: true,
        cancelable: true
      });
    }
    describe("CarouselComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          declarations: [CarouselComponent],
          imports: [CommonModule]
        }).compileComponents();
        fixture = TestBed.createComponent(CarouselComponent);
        component = fixture.componentInstance;
        component.images = ["a", "b", "c"];
      }));
      it("should create the component", () => {
        expect(component).toBeTruthy();
      });
      describe("responsive logic", () => {
        const setWindowWidth = (w) => {
          spyOnProperty(window, "innerWidth", "get").and.returnValue(w);
        };
        it("should show 3 slides on large screens", () => {
          setWindowWidth(1200);
          component.updateSlidesToShow();
          expect(component.slidesToShow).toBe(3);
        });
        it("should show 2 slides on medium screens", () => {
          setWindowWidth(800);
          component.updateSlidesToShow();
          expect(component.slidesToShow).toBe(2);
        });
        it("should show 1 slide on small screens", () => {
          setWindowWidth(500);
          component.updateSlidesToShow();
          expect(component.slidesToShow).toBe(1);
        });
      });
      describe("navigation helpers", () => {
        beforeEach(() => {
          component.currentIndex = 0;
        });
        it("next() increments index and wraps to start", () => {
          component.next();
          expect(component.currentIndex).toBe(1);
          component.currentIndex = component.images.length - 1;
          component.next();
          expect(component.currentIndex).toBe(0);
        });
        it("prev() decrements index and wraps to end", () => {
          component.prev();
          expect(component.currentIndex).toBe(component.images.length - 1);
          component.currentIndex = 1;
          component.prev();
          expect(component.currentIndex).toBe(0);
        });
      });
      describe("drag / swipe support", () => {
        const threshold = 50;
        it("should move to next slide when dragged left beyond threshold", () => {
          component.dragStartX = 100;
          const upEvent = createPointerEvent("pointerup", 30);
          spyOn(component, "next").and.callThrough();
          component.onPointerUp(upEvent);
          expect(component.next).toHaveBeenCalled();
        });
        it("should move to previous slide when dragged right beyond threshold", () => {
          component.dragStartX = 100;
          const upEvent = createPointerEvent("pointerup", 170);
          spyOn(component, "prev").and.callThrough();
          component.onPointerUp(upEvent);
          expect(component.prev).toHaveBeenCalled();
        });
        it("should not trigger navigation if drag below threshold", () => {
          component.dragStartX = 100;
          const upEvent = createPointerEvent("pointerup", 120);
          spyOn(component, "next");
          spyOn(component, "prev");
          component.onPointerUp(upEvent);
          expect(component.next).not.toHaveBeenCalled();
          expect(component.prev).not.toHaveBeenCalled();
        });
      });
    });
  }
});
export default require_carousel_component_spec();
//# sourceMappingURL=spec-app-carousel-carousel.component.spec.js.map
