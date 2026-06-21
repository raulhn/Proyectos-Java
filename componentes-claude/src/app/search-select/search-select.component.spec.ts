import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSelectComponent } from './search-select.component';
import { FormsModule } from '@angular/forms';

/** Dummy data for the tests */
// Dummy data for English and Spanish tests
const OPTIONS = [
  { id: 'a', label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: true, label: 'Cherry' },
];
// Spanish options with accents for extended testing
const SPANISH_OPTIONS = [
  { id: 'arbol', label: 'Árbol' },
  { id: 'nino', label: 'Niño' },
  { id: 'hola', label: '¡Hola!' },
  { id: 'cafe', label: 'Café' },
  { id: 'jalapeno', label: 'Jalapeño' },
  { id: 'accion', label: 'Acción' },
  { id: 'aereo', label: 'Aéreo' },
  { id: 'cancion', label: 'Canción' },
  { id: 'pinguino', label: 'Pingüino' },
  { id: 'manana', label: 'mañana' },
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

/** Additional tests focusing on Spanish examples with accents */
describe('SearchSelectComponent accent and Spanish options', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SearchSelectComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSelectComponent);
    component = fixture.componentInstance;
  });

  it('should filter accent-sensitive search correctly', () => {
    component.options = SPANISH_OPTIONS;
    fixture.detectChanges();
    component.filterText = 'á';
    component.updateFiltered();
    expect(component.filteredOptions.map(o => o.label)).toEqual(['Árbol']);
  });

  it('should filter options containing ñ correctly', () => {
    component.options = SPANISH_OPTIONS;
    fixture.detectChanges();
    component.filterText = 'ñ';
    component.updateFiltered();
    expect(component.filteredOptions.map(o => o.label)).toEqual(['Niño', 'Jalapeño', 'Pingüino']);
  });

  it('should not match accentless search for accented words', () => {
    component.options = SPANISH_OPTIONS;
    fixture.detectChanges();
    component.filterText = 'arbol';
    component.updateFiltered();
    expect(component.filteredOptions.length).toBe(0);
  });

  it('should match text inside punctuation and special characters', () => {
    component.options = SPANISH_OPTIONS;
    fixture.detectChanges();
    component.filterText = 'hola';
    component.updateFiltered();
    expect(component.filteredOptions.map(o => o.label)).toEqual(['¡Hola!']);
  });

  it('should match accented café', () => {
    component.options = SPANISH_OPTIONS;
    fixture.detectChanges();
    component.filterText = 'café';
    component.updateFiltered();
    expect(component.filteredOptions.map(o => o.label)).toEqual(['Café']);
  });

  it('should open and close dropdown correctly with Spanish options', () => {
    component.options = SPANISH_OPTIONS;
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
    component.openDropdown();
    expect(component.isOpen).toBe(true);
    component.closeDropdown();
    expect(component.isOpen).toBe(false);
  });

  it('should navigate with arrows and emit correct selection', (done) => {
    component.options = SPANISH_OPTIONS;
    fixture.detectChanges();
    component.updateFiltered(); // sets highlightIndex to 0
    let selectedId: any;
    component.selectionChange.subscribe(id => {
      selectedId = id;
    });
    // Arrow down twice (from 0 →1→2)
    component.onArrow({ key: 'ArrowDown' } as any);
    expect(component.highlightIndex).toBe(1);
    component.onArrow({ key: 'ArrowDown' } as any);
    expect(component.highlightIndex).toBe(2);
    // Enter to select
    component.onArrow({ key: 'Enter' } as any);
    setTimeout(() => {
      expect(selectedId).toBe(SPANISH_OPTIONS[2].id); // 'hola'
      done();
    }, 0);
  });
});