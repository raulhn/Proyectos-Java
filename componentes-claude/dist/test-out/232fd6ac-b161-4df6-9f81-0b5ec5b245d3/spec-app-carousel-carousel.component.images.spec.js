import {
  CarouselComponent,
  init_carousel_component
} from "./chunk-ZRWEFRKP.js";
import {
  CommonModule,
  TestBed,
  init_common,
  init_testing
} from "./chunk-Q65QT37U.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/carousel/carousel.component.images.spec.ts
var require_carousel_component_images_spec = __commonJS({
  "src/app/carousel/carousel.component.images.spec.ts"(exports) {
    init_testing();
    init_carousel_component();
    init_common();
    describe("CarouselComponent Rendering", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          declarations: [CarouselComponent],
          imports: [CommonModule]
        }).compileComponents();
        fixture = TestBed.createComponent(CarouselComponent);
        component = fixture.componentInstance;
        component.images = ["img1.jpg", "img2.jpg", "img3.jpg"];
        fixture.detectChanges();
      }));
      it("renders the correct number of image elements", () => {
        const imgEls = Array.from(fixture.nativeElement.querySelectorAll(".slides .slide"));
        expect(imgEls.length).toBe(component.images.length);
        component.images.forEach((src, i) => {
          expect(imgEls[i].getAttribute("src")).toBe(src);
        });
      });
    });
  }
});
export default require_carousel_component_images_spec();
//# sourceMappingURL=spec-app-carousel-carousel.component.images.spec.js.map
