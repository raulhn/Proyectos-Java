import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './datatable.component';

/** Utility to generate dummy rows for testing. */
function generateData(count: number) {
  return Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `Name${i + 1}` }));
}

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DataTableComponent] }).compileComponents();
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should paginate correctly with default pageSize', () => {
    const data = generateData(25); // more than one full page
    component.data = data;
    fixture.detectChanges();

    expect(component.totalPages).toBe(3, 'total pages should be 3 for 25 rows with pageSize=10');
    expect(component.paginatedData.length).toBe(10, 'first page contains 10 rows');
    expect(component.paginatedData[0].id).toBe(1);

    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.paginatedData[0].id).toBe(11);

    component.nextPage();
    expect(component.currentPage).toBe(3);
    expect(component.paginatedData.length).toBe(5, 'last page contains 5 rows');

    component.nextPage();
    expect(component.currentPage).toBe(3); // cannot go past last page

    component.prevPage();
    expect(component.currentPage).toBe(2);
  });

  it('should adjust current page after filtering reduces totalPages', () => {
    const data = generateData(25);
    component.data = data;
    fixture.detectChanges();

    component.nextPage(); // page 2
    component.nextPage(); // page 3 (last)
    expect(component.currentPage).toBe(3);

    component.filterText = '1'; // matches ids containing "1"
    component.applyFilter();
    expect(component.totalPages).toBe(2, 'filter reduces pages');
    expect(component.currentPage).toBe(2, 'current page clamped to new max');

    const ids = component.paginatedData.map(r => r.id);
    expect(ids).toContain(1);
    expect(ids).toContain(10);
    expect(ids).toContain(11);
    expect(ids).not.toContain(5);
  });

  it('should filter data correctly (case‑insensitive, diacritics removed)', () => {
    const specialData = [
      { id: 1, name: 'Álvaro' },
      { id: 2, name: 'Carlos' },
      { id: 3, name: 'maria' },
      { id: 4, name: 'Ana' },
    ];

    component.data = specialData;
    fixture.detectChanges();

    component.filterText = 'A';
    component.applyFilter();
    expect(component.filteredData.length).toBe(4, 'all names contain "a"');

    component.filterText = 'alv';
    component.applyFilter();
    expect(component.filteredData.length).toBe(1, 'diacritic‑neutral string matches only one row');
    expect(component.filteredData[0].id).toBe(1);
  });

  it('should handle datasets smaller than pageSize', () => {
    const small = generateData(5); // less than default pageSize (10)
    component.data = small;
    fixture.detectChanges();

    expect(component.totalPages).toBe(1);
    expect(component.paginatedData.length).toBe(5);
  });
});