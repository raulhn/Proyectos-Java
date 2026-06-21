import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataTableComponent } from './datatable/datatable.component';
import { SearchSelectComponent } from './search-select/search-select.component';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataTableComponent, SearchSelectComponent, CarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('prueba-datatable');

  cabeceras = ['Nombre', 'Edad', 'Ciudad'];
  datos: any[] = [
    { name: 'Alice', age: 30, city: 'New York' },
    { name: 'Bob', age: 25, city: 'Los Angeles' },
    { name: 'Charlie', age: 35, city: 'Chicago' },
    { name: 'David', age: 28, city: 'Houston' },
    { name: 'Eva', age: 32, city: 'Phoenix' },
  ];

  // Sample data for the datatable component
  sampleData = [
    { name: 'Élice', age: 30, email: 'alice@example.com' },
    { name: 'Bob', age: 25, email: 'bob@example.com' },
    { name: 'Charlíe', age: 35, email: 'charlie@example.com' },
  ];

  // Sample options for the search-select component
  largeSampleData = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    name: `Name${i + 1}`,
    age: 20 + (i % 30),
    email: `user${i}@example.com`,
  }));
  searchOptions = [
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Banana' },
    { id: 3, label: 'Cherry' },
  ];

  onSelect(id: any): void {
    console.log('Selected option ID:', id);
  }
}
