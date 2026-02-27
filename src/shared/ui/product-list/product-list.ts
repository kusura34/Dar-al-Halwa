import { Component, Input } from '@angular/core';
import { Product } from '../../models/product-model';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../core/services/product';
import { CommonModule } from '@angular/common';
import { ProductCard } from "../product-card/product-card";

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

  async addTestProduct() {
  await this.productsService.addProduct({
    name: 'Шоколадный торт',
    description: 'Очень вкусный',
    price: 1200,
    category: 'cake',
    imageUrl: 'images/cake.png',
    weight: 1500,
    isAvailable: true,
    createdAt: new Date()
  });
  console.log('data added')
}
}
