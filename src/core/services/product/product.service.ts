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
import { map, Observable } from 'rxjs';
import { Product } from '../../../shared/models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private firestore: Firestore = inject(Firestore);

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');

    return (collectionData(productsRef, { idField: 'id' }) as Observable<any[]>).pipe(
      map((products) =>
        products.map(
          (product) =>
            ({
              ...product,
              // Преобразуем Firebase Timestamp в JS Date, если поле существует
              createdAt: product.createdAt?.toDate ? product.createdAt.toDate() : product.createdAt,
            }) as Product,
        ),
      ),
    );
  }

  async addProduct(product: Omit<Product, 'id'>) {
    const productsRef = collection(this.firestore, 'products');
    return await addDoc(productsRef, {
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
}
