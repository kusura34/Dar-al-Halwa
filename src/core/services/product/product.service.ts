import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';
import { Product } from '../../../shared/models/product-model';
import { Category } from '../../../shared/models/category-model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private firestore: Firestore = inject(Firestore);
  private productsRef = collection(this.firestore, 'products');
  private productsData$: Observable<Product[]> = (
    collectionData(this.productsRef, { idField: 'id' }) as Observable<any[]>
  ).pipe(
    map((products) =>
      products.map(
        (product) =>
          ({
            ...product,
            createdAt: product.createdAt?.toDate ? product.createdAt.toDate() : product.createdAt,
          }) as Product,
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  selectedCategory$ = new BehaviorSubject<Category['slug']>('all');

  filteredProducts$: Observable<Product[]> = combineLatest([
    this.productsData$,
    this.selectedCategory$,
  ]).pipe(
    map(([products, category]) =>
      category === 'all' ? products : products.filter((p) => p.category === category),
    ),
  );

  getProducts(): Observable<Product[]> {
    return this.productsData$;
  }

  async addProduct(product: Omit<Product, 'id'>) {
    return await addDoc(this.productsRef, {
      ...product,
      createdAt: new Date(),
    });
  }

  updateProduct(id: string, product: any) {
    const docRef = doc(this.firestore, `products/${id}`);
    return updateDoc(docRef, product);
  }

  deleteProduct(id: string) {
    const docRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(docRef);
  }

  filterByCategory(category: Category['slug']) {
    this.selectedCategory$.next(category);
  }
}
