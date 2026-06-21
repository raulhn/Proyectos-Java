import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent max visibility', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
  });

  it('slidesToShow capped at 3 even if more images provided', () => {
    component.images = ['a','b','c','d','e'];
    fixture.detectChanges();
    component.updateSlidesToShow();
    expect(component.slidesToShow).toBeLessThanOrEqual(3);
  });

  it('translateX is correct for last index when > slidesToShow', () => {
    component.images = ['a','b','c','d','e'];
    fixture.detectChanges();
    component.updateSlidesToShow();
    component.currentIndex = component.images.length - 1; // last image
    fixture.detectChanges();
    const pct = Math.round(component.slideWidthPercent * (component.images.length - 1));
    expect(component.translateX).toContain(`-${pct}%`);
  });
});