import { Component, Input, Output, EventEmitter,
         ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Un selector tipo ng‑select con búsqueda incremental y posición automática.
 */
@Component({
  selector: 'app-search-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
})
export class SearchSelectComponent implements AfterViewInit {
  @Input() options: { id: any; label: string }[] = [];
  @Input() placeholder = 'Buscar…';
  @Output() selectionChange = new EventEmitter<any>();

  filterText = '';
  filteredOptions: { id: any; label: string }[] = [];
  isOpen = false;
  above = false;          // true → desplegarse arriba
  highlightIndex = -1;

  @ViewChild('dropdown') private dropdown!: ElementRef;

  constructor(private hostEl: ElementRef) {}

  ngAfterViewInit() {
    this.updateFiltered();
  }

  updateFiltered(): void {
    const clean = (s: string): string => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    const textNorm = clean(this.filterText ?? '').toLowerCase();
    this.filteredOptions = this.options.filter(
      o => clean(o.label).toLowerCase().includes(textNorm)
    );
    this.highlightIndex = this.filteredOptions.length ? 0 : -1;
  }

  openDropdown(): void {
    if (!this.options.length) return;          // nada que mostrar
    this.isOpen = true;
    setTimeout(() => this.calculatePosition(), 0);   // después de que el DOM se actualice
  }

  closeDropdown(): void {
    this.isOpen = false;
    this.highlightIndex = -1;
  }

  toggleDropdown(): void { this.isOpen ? this.closeDropdown() : this.openDropdown(); }

  private calculatePosition(): void {
    const rect = this.hostEl.nativeElement.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;

    const itemHeight = 38;                      // altura estimada de cada opción (px)
    const maxVisibleItems = Math.min(5, this.filteredOptions.length);
    const menuHeight = maxVisibleItems * itemHeight + 12;

    this.above = rect.bottom + menuHeight > viewportHeight &&
                 rect.top > menuHeight;
  }

  /** Manejo de flechas y Enter */
  onArrow(event: any): void {
    if (!this.isOpen) return;
    const count = this.filteredOptions.length;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightIndex = (this.highlightIndex + 1) % count;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightIndex = (this.highlightIndex - 1 + count) % count;
        break;
      case 'Enter':
        if (this.highlightIndex >= 0)
          this.selectOption(this.filteredOptions[this.highlightIndex]);
        break;
    }
  }

  /** Selecciona una opción */
  selectOption(opt: { id: any; label: string }): void {
    this.filterText = opt.label;
    this.selectionChange.emit(opt.id);
    this.closeDropdown();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.hostEl.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }
}
