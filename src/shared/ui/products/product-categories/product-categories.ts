import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { Category } from '../../../models/category-model';
import { CategoryService } from '../../../../core/services/category/category.service';
import { ProductsService } from '../../../../core/services/product/product.service';

@Component({
  selector: 'app-product-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-categories.html',
  styleUrl: './product-categories.scss',
})
export class ProductCategories implements AfterViewInit {
  @Input() category!: Category;

  @ViewChild('categoriesSection') categoriesSection!: ElementRef;

  private readonly categoryService = inject(CategoryService);
  private readonly productsService = inject(ProductsService);
  readonly router = inject(Router);
  readonly isCategoriesPage = this.router.url.startsWith('/categories');
  readonly selectedCategory$ = this.productsService.selectedCategory$;
  private readonly categories$ = this.categoryService.getCategories();
  private readonly products$ = this.productsService.getProducts();
  readonly displayedCategories$ = combineLatest([this.categories$, this.products$]).pipe(
    map(([categories, products]) => {
      const productsPerCategory = products.reduce<Record<string, number>>((acc, product) => {
        acc[product.category] = (acc[product.category] ?? 0) + 1;
        return acc;
      }, {});

      const sortedByPopularity = [...categories].sort(
        (a, b) => (productsPerCategory[b.slug] ?? 0) - (productsPerCategory[a.slug] ?? 0),
      );

      return this.isCategoriesPage ? sortedByPopularity : sortedByPopularity.slice(0, 4);
    }),
  );

  filterByCategory(categorySlug: Category['slug']) {
    this.productsService.filterByCategory(categorySlug);
    if (this.router.url.startsWith('/categories')) {
      this.router.navigateByUrl('/products');
    }
  }

  // categories = [
  //   { name: 'Капкейки', icon: 'images/chocolate-cupcakes.png', count: 12 },
  //   { name: 'Классика', icon: 'images/classic-cake.jpg', count: 8 },
  //   { name: 'Орехи со сгущенкой', icon: 'images/oreshki.png', count: 5 },
  //   { name: 'ПП-десерты', icon: 'images/cake-pp.png', count: 10 },
  //   { name: 'Пирожные', icon: 'images/pies.png', count: 7 },
  // ];

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.categoriesSection?.nativeElement) {
        this.categoriesSection.nativeElement.classList.add('show');
      }
    }, 100);
  }
}
