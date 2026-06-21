import {
  App,
  By,
  init_app,
  init_platform_browser
} from "./chunk-SRVBT7BG.js";
import "./chunk-ZRWEFRKP.js";
import "./chunk-WKBAYRTQ.js";
import {
  DataTableComponent,
  init_datatable_component
} from "./chunk-7OTQZMF3.js";
import "./chunk-XZ445CUG.js";
import {
  TestBed,
  init_testing
} from "./chunk-Q65QT37U.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/datatable-large.spec.ts
var require_datatable_large_spec = __commonJS({
  "src/app/datatable-large.spec.ts"(exports) {
    init_testing();
    init_app();
    init_datatable_component();
    init_platform_browser();
    describe("App component with large data", () => {
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [App]
        }).compileComponents();
        fixture = TestBed.createComponent(App);
        fixture.detectChanges();
      }));
      it("should render DataTable with at least 10 pages of results", () => {
        const datatableDebugEl = fixture.debugElement.query(By.directive(DataTableComponent));
        expect(datatableDebugEl).toBeTruthy();
        const datatableComp = datatableDebugEl.componentInstance;
        expect(datatableComp.totalPages).toBeGreaterThanOrEqual(10, "DataTable should have 10 or more pages");
      });
    });
  }
});
export default require_datatable_large_spec();
//# sourceMappingURL=spec-app-datatable-large.spec.js.map
