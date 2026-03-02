import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { CartItem } from '../../../shared/models/cart-Item.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialog } from '../order-dialog/order-dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
 // Внедряем зависимости
  public cartService = inject(CartService);
  private dialog = inject(MatDialog);

  // Используем сигналы из сервиса для удобного доступа в HTML
  items = this.cartService.cartItems;
  total = this.cartService.totalAmount;
  selectedCount = this.cartService.selectedCount;

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.id, 1);
  }

  decrease(item: CartItem) {
    this.cartService.updateQuantity(item.id, -1);
  }

  toggle(item: CartItem) {
    this.cartService.toggleSelection(item.id);
  }

  remove(id: string) {
    this.cartService.removeItem(id);
  }

  openOrderDialog() {
    // Открываем окно оформления, передавая туда только выбранные товары
    const selectedItems = this.items().filter(i => i.selected);
    
    this.dialog.open(OrderDialog, {
      width: '500px',
      data: { items: selectedItems, total: this.total() },
      disableClose: true
    });
  }
}
