import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
isMenuOpen = false;

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
