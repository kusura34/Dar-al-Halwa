import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
categories = [
    { name: 'Бенто-торты', icon: 'images/bento-cake.png', count: 12 },
    { name: 'Классика', icon: 'images/classic-cake.png', count: 8 },
    { name: 'Наборы', icon: 'images/cake-box.png', count: 5 },
    { name: 'ПП-десерты', icon: 'images/cake-pp.png', count: 10 }
  ];
}
