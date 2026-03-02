import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product-model';
import { CartService } from '../../../../core/services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private snackBar = inject(MatSnackBar);

  cartService = inject(CartService);

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.snackBar.open(`Товар ${product.name} добавлен в корзину`, 'OK', { duration: 2000 });
  }

  @Input()
  product!: Product;
}
