import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSelectComponent } from './search-select.component';
import { FormsModule } from '@angular/forms';

/** Dummy data for the tests */
const OPTIONS = [
  { id: 'a', label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: true, label: 'Cherry' },
];

describe('SearchSelectComponent', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SearchSelectComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSelectComponent);
    component = fixture.componentInstance;
  });

  it('should filter options based on the input text', () => {
    component.options = OPTIONS;
    fixture.detectChanges();

    // No filtering yet – all items shown
    expect(component.filteredOptions.length).toBe(3);

    component.filterText = 'a'; // matches Apple and Banana
    component.updateFiltered();
    expect(component.filteredOptions.map(o => o.label)).toEqual(['Apple', 'Banana']);

    component.filterText = 'cherry';
    component.updateFiltered();
    expect(component.filteredOptions).toEqual([OPTIONS[2]]);
  });

  it('should emit the id of the selected option', (done) => {
    component.options = OPTIONS;
    fixture.detectChanges();

    component.selectionChange.subscribe((id: any) => {
      // The test only checks that an event was emitted with the correct id.
      expect(id).toBe('a');
      done();
    });

    // Simulate clicking on the first option (Apple)
    component.selectOption(OPTIONS[0]);
  });

  it('should open and close dropdown correctly', () => {
    component.options = OPTIONS;
    fixture.detectChanges();

    expect(component.isOpen).toBe(false);

    component.openDropdown();
    expect(component.isOpen).toBe(true);

    component.closeDropdown();
    expect(component.isOpen).toBe(false);
  });
});