import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Observable, shareReplay } from 'rxjs';
import { Category } from '../../../shared/models/category-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore: Firestore = inject(Firestore);
  private categoriesRef = collection(this.firestore, 'categories');
  private categoriesData$: Observable<Category[]> = (
    collectionData(this.categoriesRef, { idField: 'id' }) as Observable<Category[]>
  ).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getCategories(): Observable<Category[]> {
    return this.categoriesData$;
  }

  async addCategory(categoryName: string, iconUrl: string) {
    const normalizedName = categoryName.trim();
    const slug = normalizedName.toLowerCase();

    return await addDoc(this.categoriesRef, {
      name: normalizedName,
      slug,
      icon: iconUrl,
    });
  }

  async deleteCategory(id: string) {
    const docRef = doc(this.firestore, `categories/${id}`);
    return await deleteDoc(docRef);
  }
}
