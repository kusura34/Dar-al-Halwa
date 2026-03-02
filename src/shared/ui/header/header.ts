import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  public cartService = inject(CartService);

  selectedCount = this.cartService.selectedCount;

  isMenuOpen = false;

  get isProductsPage(): boolean {
    return this.router.url === '/products';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
}
