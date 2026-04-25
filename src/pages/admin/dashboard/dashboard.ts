import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductsService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  readonly products$ = this.productsService.getProducts();
  readonly categories$ = this.categoryService.getCategories();
  readonly stats$ = this.products$.pipe(
    map((products) => {
      const availableCount = products.filter((product) => product.isAvailable).length;
      const totalValue = products.reduce((sum, product) => sum + Number(product.price || 0), 0);
      return {
        totalProducts: products.length,
        availableCount,
        totalValue,
      };
    }),
  );
  readonly latestProducts$ = this.products$.pipe(
    map((products) =>
      [...products]
        .sort(
          (a, b) =>
            new Date(b.createdAt as any).getTime() - new Date(a.createdAt as any).getTime(),
        )
        .slice(0, 5),
    ),
  );
}
