import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductCard } from "../product-card/product-card";
import { ProductsService } from '../../../../core/services/product/product.service';
import { Product } from '../../../models/product-model';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  @Input() product!: Product;

  products$: Observable<Product[]>;

  constructor(private productsService: ProductsService) {
    this.products$ = this.productsService.getProducts();
  }
}
