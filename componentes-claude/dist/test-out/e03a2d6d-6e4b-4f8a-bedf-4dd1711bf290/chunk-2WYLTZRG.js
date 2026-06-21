import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  EventEmitter,
  Input,
  Output,
  __decorate,
  init_common,
  init_core,
  init_tslib_es6
} from "./chunk-2RDO5OP5.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/datatable/datatable.component.html
var datatable_component_default;
var init_datatable_component = __esm({
  "angular:jit:template:src/app/datatable/datatable.component.html"() {
    datatable_component_default = '<div class="datatable">\n  <div class="toolbar">\n    <input type="text" placeholder="Filter\u2026" (input)="onFilterChange($event)" />\n    <button type="button" (click)="exportCsv()">Export CSV</button>\n  </div>\n\n  <table *ngIf="paginatedData.length; else noData">\n    <thead>\n      <tr>\n        <th *ngFor="let col of columns">{{ col | titlecase }}</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor="let row of paginatedData" (click)="selectRow(row)"\n        [class.selected]="row === selectedRow" style="cursor: pointer;">\n        <td *ngFor="let col of columns">{{ row[col] }}</td>\n      </tr>\n    </tbody>\n  </table>\n<div class="pagination" *ngIf="totalPages > 1">\n  <button type="button" (click)="prevPage()" [disabled]="currentPage===1">Prev</button>\n  <span>Page {{currentPage}} / {{totalPages}}</span>\n  <button type="button" (click)="nextPage()" [disabled]="currentPage===totalPages">Next</button>\n</div>\n\n<style>\n  .pagination {\n    display: flex;\n    justify-content: center;\n    gap: 0.5rem;\n    margin-top: 0.75rem;\n  }\n  button[disabled] {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n</style>\n\n<ng-template #noData>\n    <p>No data available.</p>\n  </ng-template>\n</div>';
  }
});

// angular:jit:style:src/app/datatable/datatable.component.scss
var datatable_component_default2;
var init_datatable_component2 = __esm({
  "angular:jit:style:src/app/datatable/datatable.component.scss"() {
    datatable_component_default2 = "/* src/app/datatable/datatable.component.scss */\n.selected {\n  background-color: #007bff;\n  color: white;\n}\n.datatable {\n  margin: 1rem;\n}\n.datatable .selected {\n  background-color: #007bff;\n  color: white;\n}\n.datatable .selected {\n  background-color: #007bff;\n  color: white;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\n.toolbar {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.toolbar .selected {\n  background-color: #007bff;\n  color: white;\n}\n.toolbar .selected {\n  background-color: #007bff;\n  color: white;\n}\n.toolbar .selected {\n  background-color: #007bff;\n  color: white;\n}\n.toolbar .selected {\n  background-color: #007bff;\n  color: white;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\ninput[type=text] {\n  padding: 0.25rem 0.5rem;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\ninput[type=text] .selected {\n  background-color: #007bff;\n  color: white;\n}\ninput[type=text] .selected {\n  background-color: #007bff;\n  color: white;\n}\ninput[type=text] .selected {\n  background-color: #007bff;\n  color: white;\n}\ninput[type=text] .selected {\n  background-color: #007bff;\n  color: white;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton {\n  padding: 0.25rem 0.75rem;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton .selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton .selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton .selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton .selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton .selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton .selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton .selected {\n  background-color: #007bff;\n  color: white;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton:hover {\n  background-color: #0069d9;\n}\nbutton:hover .selected {\n  background-color: #007bff;\n  color: white;\n}\nbutton:hover .selected {\n  background-color: #007bff;\n  color: white;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n}\ntable .selected {\n  background-color: #007bff;\n  color: white;\n}\ntable .selected {\n  background-color: #007bff;\n  color: white;\n}\ntable .selected {\n  background-color: #007bff;\n  color: white;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\nth,\ntd {\n  text-align: left;\n  padding: 0.5rem;\n  border-bottom: 1px solid #ddd;\n}\nth .selected,\ntd .selected {\n  background-color: #007bff;\n  color: white;\n}\nth .selected,\ntd .selected {\n  background-color: #007bff;\n  color: white;\n}\nth .selected,\ntd .selected {\n  background-color: #007bff;\n  color: white;\n}\nth .selected,\ntd .selected {\n  background-color: #007bff;\n  color: white;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\nth {\n  background-color: #f8f9fa;\n}\nth .selected {\n  background-color: #007bff;\n  color: white;\n}\nth .selected {\n  background-color: #007bff;\n  color: white;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\n/*# sourceMappingURL=datatable.component.css.map */\n";
  }
});

// src/app/datatable/datatable.component.ts
var DataTableComponent;
var init_datatable_component3 = __esm({
  "src/app/datatable/datatable.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_datatable_component();
    init_datatable_component2();
    init_core();
    init_common();
    DataTableComponent = class DataTableComponent2 {
      data = [];
      filteredData = [];
      // full filtered data
      // Pagination settings
      pageSize = 10;
      currentPage = 1;
      filterText = "";
      columns = [];
      rowSelected = new EventEmitter();
      selectedRow = null;
      selectRow(row) {
        this.selectedRow = row;
        this.rowSelected.emit(row);
      }
      ngOnChanges(changes) {
        if (changes["data"]) {
          this.columns = this.data.length ? Object.keys(this.data[0]) : [];
          this.applyFilter();
        }
      }
      applyFilter() {
        const text = this.filterText?.toLowerCase() ?? "";
        if (!text) {
          this.filteredData = [...this.data];
        } else {
          const normalize = (s) => s.normalize("NFD").replace(new RegExp("\\p{Diacritic}", "gu"), "");
          this.filteredData = this.data.filter((row) => Object.values(row).some((v) => {
            const str = typeof v === "string" ? v : String(v);
            return normalize(str.toLowerCase()).includes(normalize(text));
          }));
        }
        this.adjustCurrentPage();
      }
      onFilterChange(event) {
        const input = event.target;
        this.filterText = input.value;
        this.applyFilter();
      }
      // Pagination helpers
      get totalPages() {
        return Math.ceil(this.filteredData.length / this.pageSize) || 1;
      }
      get paginatedData() {
        const startIdx = (this.currentPage - 1) * this.pageSize;
        return this.filteredData.slice(startIdx, startIdx + this.pageSize);
      }
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
      adjustCurrentPage() {
        const maxPage = this.totalPages;
        if (this.currentPage > maxPage) {
          this.currentPage = maxPage;
        }
      }
      exportCsv() {
        if (!this.filteredData.length)
          return;
        const headers = Object.keys(this.data[0] || {});
        const csvRows = [headers.join(",")];
        for (const row of this.filteredData) {
          const csvRow = headers.map((h) => {
            const val = row[h];
            if (typeof val === "string") {
              return `"${val.replace(/"/g, '""')}"`;
            }
            return String(val);
          }).join(",");
          csvRows.push(csvRow);
        }
        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      static propDecorators = {
        data: [{ type: Input }],
        rowSelected: [{ type: Output }]
      };
    };
    DataTableComponent = __decorate([
      Component({
        selector: "app-datatable",
        standalone: true,
        imports: [CommonModule],
        template: datatable_component_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [datatable_component_default2]
      })
    ], DataTableComponent);
  }
});

export {
  DataTableComponent,
  init_datatable_component3 as init_datatable_component
};
//# sourceMappingURL=chunk-2WYLTZRG.js.map
