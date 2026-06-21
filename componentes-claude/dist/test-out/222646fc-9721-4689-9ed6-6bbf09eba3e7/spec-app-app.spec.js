import {
  App,
  init_app
} from "./chunk-3TDUJBUU.js";
import "./chunk-6A2LTIIW.js";
import "./chunk-OIWFA576.js";
import "./chunk-3QIJVQQY.js";
import "./chunk-XUU4BFFS.js";
import {
  TestBed,
  init_testing
} from "./chunk-IXAXC6BC.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_testing();
    init_app();
    describe("App", () => {
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [App]
        }).compileComponents();
      }));
      it("should create the app", () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
      it("should render title", () => {
        const fixture = TestBed.createComponent(App);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("Hello, prueba-datatable");
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app-app.spec.js.map
