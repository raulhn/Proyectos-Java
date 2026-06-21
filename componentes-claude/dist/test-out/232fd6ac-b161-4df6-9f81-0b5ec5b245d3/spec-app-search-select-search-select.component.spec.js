import {
  FormsModule,
  SearchSelectComponent,
  init_forms,
  init_search_select_component
} from "./chunk-WKBAYRTQ.js";
import {
  TestBed,
  init_testing
} from "./chunk-Q65QT37U.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/search-select/search-select.component.spec.ts
var require_search_select_component_spec = __commonJS({
  "src/app/search-select/search-select.component.spec.ts"(exports) {
    init_testing();
    init_search_select_component();
    init_forms();
    var OPTIONS = [
      { id: "a", label: "Apple" },
      { id: 2, label: "Banana" },
      { id: true, label: "Cherry" }
    ];
    describe("SearchSelectComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [FormsModule, SearchSelectComponent]
          // standalone component
        }).compileComponents();
        fixture = TestBed.createComponent(SearchSelectComponent);
        component = fixture.componentInstance;
      }));
      it("should filter options based on the input text", () => {
        component.options = OPTIONS;
        fixture.detectChanges();
        expect(component.filteredOptions.length).toBe(3);
        component.filterText = "a";
        component.updateFiltered();
        expect(component.filteredOptions.map((o) => o.label)).toEqual(["Apple", "Banana"]);
        component.filterText = "cherry";
        component.updateFiltered();
        expect(component.filteredOptions).toEqual([OPTIONS[2]]);
      });
      it("should emit the id of the selected option", (done) => {
        component.options = OPTIONS;
        fixture.detectChanges();
        component.selectionChange.subscribe((id) => {
          expect(id).toBe("a");
          done();
        });
        component.selectOption(OPTIONS[0]);
      });
      it("should open and close dropdown correctly", () => {
        component.options = OPTIONS;
        fixture.detectChanges();
        expect(component.isOpen).toBe(false);
        component.openDropdown();
        expect(component.isOpen).toBe(true);
        component.closeDropdown();
        expect(component.isOpen).toBe(false);
      });
    });
  }
});
export default require_search_select_component_spec();
//# sourceMappingURL=spec-app-search-select-search-select.component.spec.js.map
