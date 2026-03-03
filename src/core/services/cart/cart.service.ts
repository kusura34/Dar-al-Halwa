import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CartItem } from '../../../shared/models/cart-Item.model';
import { Product } from '../../../shared/models/product-model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private items = signal<CartItem[]>(this.loadFromStorage());

  readonly cartItems = this.items.asReadonly();

  // Автоматический подсчет итогов для выбранных товаров
  readonly selectedCount = computed(() => this.items().filter((i) => i.selected).length);

  readonly totalAmount = computed(() =>
    this.items()
      .filter((i) => i.selected)
      .reduce((sum, i) => sum + i.price * i.quantity, 0),
  );

  private saveToStorage(items: CartItem[]) {
    this.items.set(items);
    
    // Сохраняем только если мы в браузере
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('dar_al_halwa_cart', JSON.stringify(items));
    }
  }

  private loadFromStorage(): CartItem[] {
    // Добавляем проверку здесь!
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('dar_al_halwa_cart');
      try {
        return data ? JSON.parse(data) : [];
      } catch (e) {
        console.error('Ошибка парсинга корзины из LocalStorage', e);
        return [];
      }
    }
    // Если мы на сервере (SSR), просто возвращаем пустой список
    return [];
  }

  addToCart(product: Product) {
    const current = this.items();
    const index = current.findIndex((i) => i.id === product.id);

    if (index > -1) {
      // Если торт уже в корзине, просто увеличим счетчик
      const updated = [...current];
      updated[index].quantity++;
      this.saveToStorage(updated);
    } else {
      // Превращаем Product в CartItem
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
        selected: true,
      };
      this.saveToStorage([...current, newItem]);
    }
  }

  updateQuantity(id: string, delta: number) {
    const updated = this.items().map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    this.saveToStorage(updated);
  }

  toggleSelection(id: string) {
    const updated = this.items().map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item,
    );
    this.saveToStorage(updated);
  }

  removeItem(id: string) {
    this.saveToStorage(this.items().filter((i) => i.id !== id));
  }
}
