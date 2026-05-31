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
export class ProductCategories {
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
}
