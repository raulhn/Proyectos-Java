import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent image rendering', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    component.images = ['a.jpg', 'b.jpg'];
    fixture.detectChanges();
  });

  it('should use object-fit: contain on slide images', () => {
    const imgEls = fixture.nativeElement.querySelectorAll('.slide');
    expect(imgEls.length).toBe(2);
    imgEls.forEach((el: HTMLElement) => {
      const style = window.getComputedStyle(el as Element);
      expect(style.objectFit).toBe('contain');
    });
  });
});