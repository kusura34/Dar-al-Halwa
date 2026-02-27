import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.scss',
})
export class AdminProducts {
  private productsService = inject(ProductsService);
  products$ = this.productsService.getProducts();

  deleteProduct(id: string) {
    if (confirm('Удалить этот шедевр?')) {
      this.productsService.deleteProduct(id)
    }
  }

  openAddModal() {
    // Логика открытия формы
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
