import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private firestore: Firestore = inject(Firestore)

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<Product[]>;
  }

  async addProduct(product: Omit<Product, 'id'>) {
    const productsRef = collection(this.firestore, 'products');
    return await addDoc(productsRef, {
      ...product,
      createdAt: new Date()
    });
  }
}
