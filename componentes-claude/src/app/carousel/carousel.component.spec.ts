import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { CommonModule } from '@angular/common';

// Utility to create a dummy PointerEvent for tests
function createPointerEvent(type: string, clientX: number): PointerEvent {
  return new PointerEvent(type as any, {
    clientX,
    bubbles: true,
    cancelable: true,
  });
}

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    // provide a small set of images for predictable indices
    component.images = ['a', 'b', 'c'];
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('responsive logic', () => {
    const setWindowWidth = (w: number) => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(w);
    };

    it('should show 3 slides on large screens', () => {
      setWindowWidth(1200);
      (component as any).updateSlidesToShow();
      expect(component.slidesToShow).toBe(3);
    });

    it('should show 2 slides on medium screens', () => {
      setWindowWidth(800);
      (component as any).updateSlidesToShow();
      expect(component.slidesToShow).toBe(2);
    });

    it('should show 1 slide on small screens', () => {
      setWindowWidth(500);
      (component as any).updateSlidesToShow();
      expect(component.slidesToShow).toBe(1);
    });
  });

  describe('navigation helpers', () => {
    beforeEach(() => {
      component.currentIndex = 0;
    });

    it('next() increments index and wraps to start', () => {
      component.next();
      expect(component.currentIndex).toBe(1);
      component.currentIndex = component.images.length - 1;
      component.next();
      expect(component.currentIndex).toBe(0);
    });

    it('prev() decrements index and wraps to end', () => {
      component.prev();
      expect(component.currentIndex).toBe(component.images.length - 1);
      component.currentIndex = 1;
      component.prev();
      expect(component.currentIndex).toBe(0);
    });
  });

  describe('drag / swipe support', () => {
    const threshold = 50;

    it('should move to next slide when dragged left beyond threshold', () => {
      (component as any).dragStartX = 100; // start
      const upEvent = createPointerEvent('pointerup', 30); // delta -70 (<-threshold)
      spyOn(component, 'next').and.callThrough();
      component.onPointerUp(upEvent as any);
      expect(component.next).toHaveBeenCalled();
    });

    it('should move to previous slide when dragged right beyond threshold', () => {
      (component as any).dragStartX = 100; // start
      const upEvent = createPointerEvent('pointerup', 170); // delta +70 (>threshold)
      spyOn(component, 'prev').and.callThrough();
      component.onPointerUp(upEvent as any);
      expect(component.prev).toHaveBeenCalled();
    });

    it('should not trigger navigation if drag below threshold', () => {
      (component as any).dragStartX = 100;
      const upEvent = createPointerEvent('pointerup', 120); // delta +20 (<threshold)
      spyOn(component, 'next');
      spyOn(component, 'prev');
      component.onPointerUp(upEvent as any);
      expect(component.next).not.toHaveBeenCalled();
      expect(component.prev).not.toHaveBeenCalled();
    });
  });
});
