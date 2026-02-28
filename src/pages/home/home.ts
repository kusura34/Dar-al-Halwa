import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { ProductList } from '../../shared/ui/products/product-list/product-list';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  categories = [
    { name: 'Бенто-торты', icon: 'images/bento-cake.png', count: 12 },
    { name: 'Классика', icon: 'images/classic-cake.png', count: 8 },
    { name: 'Наборы', icon: 'images/cake-box.png', count: 5 },
    { name: 'ПП-десерты', icon: 'images/cake-pp.png', count: 10 }
  ];

  @ViewChild('categoriesSection') section!: ElementRef;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.section.nativeElement.classList.add('show');
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(this.section.nativeElement);
    }
  }
}