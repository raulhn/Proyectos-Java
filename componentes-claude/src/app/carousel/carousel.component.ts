import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  imports: [CommonModule],
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy, OnChanges {
  /** Image URLs – can be passed in by the parent */
  /**
   * Image URLs – can be passed in by the parent
   */
  @Input() images: string[] = [];
  /** Images actually rendered, capped at a maximum of three */

  /** How many slides are visible at once */
  slidesToShow = 1;

  anchoSlide: string = '100%';
  /** Current start index (0‑based) of the viewport */
  currentIndex = 0;

  /* ---- private helpers ------------------------------------------------- */

  private autoPlay$?: Subscription; // Auto‑slide timer

  @ViewChild('slideContainer') slideContainer!: ElementRef<HTMLDivElement>;
  isDragging = false;
  dragTranslatePct?: number;
  private dragStartX = 0; // X position when dragging starts

  /** Width of a single slide in % (e.g. 33.333% for 3 slides) */
  get slideWidthPercent(): number {
    return 100 / this.slidesToShow;
  }

  /** CSS transform applied to the slides container */
  get translateX(): string {
    const pct = -this.currentIndex * this.slideWidthPercent;
    if (this.isDragging && this.dragTranslatePct !== undefined) {
      return `translateX(${pct + this.dragTranslatePct}%)`;
    }
    return `translateX(${pct}%)`;
  }

  /* ---- life‑cycle ----------------------------------------------------- */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      this.updateSlidesToShow();
      // Reset index when images change
      this.currentIndex = 0;
    }
  }

  ngOnInit(): void {
    this.updateSlidesToShow();
    // Start auto‑play if desired
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.autoPlay$?.unsubscribe();
  }

  /* ---- auto‑play ------------------------------------------------------- */

  private startAutoPlay() {
    // change slide every 3 s
    this.autoPlay$ = interval(3000).subscribe(() => this.next());
  }

  pauseAutoPlay(): void {
    this.autoPlay$?.unsubscribe();
    this.autoPlay$ = undefined;
  }

  resumeAutoPlay(): void {
    if (!this.autoPlay$) {
      this.startAutoPlay();
    }
  }

  /* ---- navigation helpers ---------------------------------------------- */

  next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // wrap back to start
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  /* ---- responsive logic ------------------------------------------------ */

  public updateSlidesToShow() {
    const width = window.innerWidth;

    if (width >= 1024) {
      this.slidesToShow = Math.min(3, this.images.length);
      this.anchoSlide = `${100 / this.slidesToShow}%`;
    } else if (width >= 640) {
      this.slidesToShow = Math.min(2, this.images.length);
      this.anchoSlide = `${100 / this.slidesToShow}%`;
    } else {
      this.slidesToShow = 1;
      this.anchoSlide = '100%';
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSlidesToShow();
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(e: PointerEvent) {
    e.preventDefault(); // avoid text selection
    this.pauseAutoPlay();
    this.isDragging = true;
    this.dragStartX = e.clientX;
  }

  @HostListener('pointerup', ['$event'])
  onPointerUp(e: PointerEvent) {
    const delta = e.clientX - this.dragStartX;
    const containerWidth = this.slideContainer?.nativeElement.offsetWidth || 1;
    const slidePx = containerWidth / this.slidesToShow;
    if (delta > slidePx / 2) {
      this.prev();
    } else if (delta < -slidePx / 2) {
      this.next();
    }
    this.resumeAutoPlay();
    this.isDragging = false;
    this.dragTranslatePct = undefined;
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(e: PointerEvent) {
    if (!this.isDragging) return;
    const delta = e.clientX - this.dragStartX;
    const containerWidth = this.slideContainer?.nativeElement.offsetWidth || 1;
    const pctOffset = (delta / containerWidth) * 100;
    this.dragTranslatePct = pctOffset;
  }

  @HostListener('pointerleave', ['$event'])
  onPointerLeave(e: PointerEvent) {
    // cancel drag if the pointer leaves the carousel area mid‑drag
    this.dragStartX = 0;
    this.isDragging = false;
    this.resumeAutoPlay();
  }
}
