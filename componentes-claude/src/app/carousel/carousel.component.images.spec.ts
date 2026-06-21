import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { CommonModule } from '@angular/common';

describe('CarouselComponent Rendering', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    // Provide a deterministic list of images
    component.images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
    fixture.detectChanges();
  });

  it('renders the correct number of image elements', () => {
    const imgEls: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.slides .slide')
    );
    expect(imgEls.length).toBe(component.images.length);
    component.images.forEach((src, i) => {
      expect(imgEls[i].getAttribute('src')).toBe(src);
    });
  });
});