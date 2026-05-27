import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { ProductList } from '../../shared/ui/products/product-list/product-list';
import { RouterLink } from '@angular/router';
import { ProductCategories } from "../../shared/ui/products/product-categories/product-categories";

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductList, RouterLink, ProductCategories],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}