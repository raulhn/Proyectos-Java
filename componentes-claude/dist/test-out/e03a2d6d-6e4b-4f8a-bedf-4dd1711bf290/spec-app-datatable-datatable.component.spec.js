import {
  DataTableComponent,
  init_datatable_component
} from "./chunk-2WYLTZRG.js";
import {
  TestBed,
  init_testing
} from "./chunk-2RDO5OP5.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/datatable/datatable.component.spec.ts
var require_datatable_component_spec = __commonJS({
  "src/app/datatable/datatable.component.spec.ts"(exports) {
    init_testing();
    init_datatable_component();
    function generateData(count) {
      return Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `Name${i + 1}` }));
    }
    describe("DataTableComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({ imports: [DataTableComponent] }).compileComponents();
        fixture = TestBed.createComponent(DataTableComponent);
        component = fixture.componentInstance;
      }));
      it("should paginate correctly with default pageSize", () => {
        const data = generateData(25);
        component.data = data;
        fixture.detectChanges();
        expect(component.totalPages).toBe(3, "total pages should be 3 for 25 rows with pageSize=10");
        expect(component.paginatedData.length).toBe(10, "first page contains 10 rows");
        expect(component.paginatedData[0].id).toBe(1);
        component.nextPage();
        expect(component.currentPage).toBe(2);
        expect(component.paginatedData[0].id).toBe(11);
        component.nextPage();
        expect(component.currentPage).toBe(3);
        expect(component.paginatedData.length).toBe(5, "last page contains 5 rows");
        component.nextPage();
        expect(component.currentPage).toBe(3);
        component.prevPage();
        expect(component.currentPage).toBe(2);
      });
      it("should adjust current page after filtering reduces totalPages", () => {
        const data = generateData(25);
        component.data = data;
        fixture.detectChanges();
        component.nextPage();
        component.nextPage();
        expect(component.currentPage).toBe(3);
        component.filterText = "1";
        component.applyFilter();
        expect(component.totalPages).toBe(2, "filter reduces pages");
        expect(component.currentPage).toBe(2, "current page clamped to new max");
        const ids = component.paginatedData.map((r) => r.id);
        expect(ids).toContain(1);
        expect(ids).toContain(10);
        expect(ids).toContain(11);
        expect(ids).not.toContain(5);
      });
      it("should filter data correctly (case\u2011insensitive, diacritics removed)", () => {
        const specialData = [
          { id: 1, name: "\xC1lvaro" },
          { id: 2, name: "Carlos" },
          { id: 3, name: "maria" },
          { id: 4, name: "Ana" }
        ];
        component.data = specialData;
        fixture.detectChanges();
        component.filterText = "A";
        component.applyFilter();
        expect(component.filteredData.length).toBe(4, 'all names contain "a"');
        component.filterText = "alv";
        component.applyFilter();
        expect(component.filteredData.length).toBe(1, "diacritic\u2011neutral string matches only one row");
        expect(component.filteredData[0].id).toBe(1);
      });
      it("should handle datasets smaller than pageSize", () => {
        const small = generateData(5);
        component.data = small;
        fixture.detectChanges();
        expect(component.totalPages).toBe(1);
        expect(component.paginatedData.length).toBe(5);
      });
    });
  }
});
export default require_datatable_component_spec();
//# sourceMappingURL=spec-app-datatable-datatable.component.spec.js.map
