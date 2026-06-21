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
} from "./chunk-SIFJ2CCH.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/datatable/datatable.component.html
var datatable_component_default;
var init_datatable_component = __esm({
  "angular:jit:template:src/app/datatable/datatable.component.html"() {
    datatable_component_default = `<div class="datatable">
  <div class="toolbar">
    <input type="text" placeholder="Filter\u2026" (input)="onFilterChange($event)" />
    <button type="button" (click)="exportCsv()">Export CSV</button>
  </div>

  @if (paginatedData.length) {
    <table>
      <thead>
        <tr>
          @for (col of columns; track col) {
            <th (click)="sortData(col)" [class.active]="sortColumn === col">
              {{ col | titlecase }}
              @if (sortColumn === col && sortDirection === 'asc') {
                <span class="indicator asc">\u25B2</span>
                <span class="indicator desc unselected">\u25BC</span>
              } @else if (sortColumn === col && sortDirection === 'desc') {
                <span class="indicator desc unselected">\u25BC</span>
                <span class="indicator desc">\u25B2</span>
              } @else {
                <span class="indicator asc unselected">\u25B2</span>
                <span class="indicator desc unselected">\u25BC</span>
              }
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of paginatedData; track row) {
          <tr
            (click)="selectRow(row)"
            [class.selected]="row === selectedRow"
            style="cursor: pointer"
          >
            @for (col of columns; track col) {
              <td>{{ row[col] }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  } @else {
    <table noData></table>
  }
  @if (totalPages > 1) {
    <div class="pagination">
      <button type="button" (click)="goToPage(1)" [disabled]="currentPage===1">First</button>
      <button type="button" (click)="prevPage()" [disabled]="currentPage===1">Prev</button>

      @if (pageNumbers.length && pageNumbers[0] > 2) {
        <span>\u2026</span>
      }

      @for (p of pageNumbers; track p; let i = $index) {
        <span *ngIf="i>0 && p - pageNumbers[i-1] > 1">\u2026</span>
        <button type="button" (click)="goToPage(p)" [disabled]="p===currentPage" [class.active]="p===currentPage">{{p}}</button>
      }

      @if (pageNumbers.length && pageNumbers[pageNumbers.length-1] < totalPages - 1) {
        <span>\u2026</span>
      }

      <button type="button" (click)="nextPage()" [disabled]="currentPage===totalPages">Next</button>
      <button type="button" (click)="goToPage(totalPages)" [disabled]="currentPage===totalPages">Last</button>
    </div>
  }

  <style>
    .pagination {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }
    button[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
  </style>

  <ng-template #noData>
    <p>No data available.</p>
  </ng-template>
</div>`;
  }
});

// angular:jit:style:src/app/datatable/datatable.component.scss
var datatable_component_default2;
var init_datatable_component2 = __esm({
  "angular:jit:style:src/app/datatable/datatable.component.scss"() {
    datatable_component_default2 = "/* src/app/datatable/datatable.component.scss */\n.datatable {\n  margin: 1rem;\n}\n.toolbar {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n}\ninput[type=text] {\n  padding: 0.25rem 0.5rem;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\nbutton {\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton:hover {\n  background-color: #0069d9;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n}\n.selected {\n  background-color: #007bff;\n  color: white;\n}\nth,\ntd {\n  text-align: left;\n  border-bottom: 1px solid #ddd;\n}\nth {\n  background-color: #f8f9fa;\n}\nth .selected {\n  background-color: #007bff;\n  color: white;\n}\n.unselected {\n  color: gray;\n}\n/*# sourceMappingURL=datatable.component.css.map */\n";
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
      sortData(col) {
        if (this.sortColumn === col) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
          this.sortColumn = col;
          this.sortDirection = "asc";
        }
        this.applyFilter();
      }
      onFilterChange(event) {
        const input = event.target;
        this.filterText = input.value;
        this.applyFilter();
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
        if (this.sortColumn) {
          const col = this.sortColumn;
          const dir = this.sortDirection === "asc" ? 1 : -1;
          this.filteredData.sort((a, b) => {
            const aVal = a[col];
            const bVal = b[col];
            if (typeof aVal === "string" && typeof bVal === "string") {
              return dir * aVal.localeCompare(bVal);
            }
            if (aVal < bVal)
              return -1 * dir;
            if (aVal > bVal)
              return 1 * dir;
            return 0;
          });
        }
        this.adjustCurrentPage();
      }
      // Sorting state
      get totalPages() {
        return Math.max(1, Math.ceil(this.filteredData.length / this.pageSize));
      }
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      }
      // Sorting state
      sortColumn = null;
      sortDirection = "asc";
      get pageNumbers() {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;
        if (end > this.totalPages) {
          end = this.totalPages;
          start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++)
          pages.push(i);
        return pages;
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
//# sourceMappingURL=chunk-QMTRLPG2.js.map
