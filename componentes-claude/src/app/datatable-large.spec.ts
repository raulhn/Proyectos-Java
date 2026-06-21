import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { DataTableComponent } from './datatable/datatable.component';
import { By } from '@angular/platform-browser';

describe('App component with large data', () => {
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // trigger bindings and ngOnChanges
  });

  it('should render DataTable with at least 10 pages of results', () => {
    const datatableDebugEl = fixture.debugElement.query(By.directive(DataTableComponent));
    expect(datatableDebugEl).toBeTruthy();
    const datatableComp: any = datatableDebugEl.componentInstance;

    // The DataTable component exposes totalPages
    expect(datatableComp.totalPages).toBeGreaterThanOrEqual(10, 'DataTable should have 10 or more pages');
  });
});