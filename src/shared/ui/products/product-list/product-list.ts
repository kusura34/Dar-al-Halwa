import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { ProductsService } from '../../../../core/services/product/product.service';
import { Product } from '../../../models/product-model';
import { Category } from '../../../models/category-model';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  @Input() product!: Product;

  private productService: ProductsService = inject(ProductsService);
  filteredProducts$: Observable<Product[]> = this.productService.filteredProducts$;
  selectedCategory$ = this.productService.selectedCategory$;

  filterByCategory(category: Category['slug']) {
    this.productService.filterByCategory(category);
  }
}
