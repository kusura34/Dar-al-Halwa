import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { ProductAddDialog } from '../product-add-dialog/product-add-dialog';
import { Product } from '../../../shared/models/product-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.scss',
})
export class AdminProducts {
  private productsService = inject(ProductsService);
  products$ = this.productsService.getProducts();
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar)

  deleteProduct(id: string) {
    if (confirm('Удалить этот шедевр?')) {
      this.productsService.deleteProduct(id);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductAddDialog, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.productsService.addProduct(result)
      }
    });
  }

  editProduct(product: Product) {
  const dialogRef = this.dialog.open(ProductAddDialog, {
    width: '500px',
    data: product // Передаем объект продукта целиком
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.productsService.updateProduct(product.id, result)
        .then(() => this.snackBar.open('Обновлено!', 'OK'))
        .catch(() => this.snackBar.open('Ошибка обновления', 'Упс'));
    }
  });
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
      createdAt: new Date(),
    });
    console.log('data added');
  }
}
