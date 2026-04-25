import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CommonModule } from '@angular/common';
import { getDownloadURL, ref, uploadBytes, getStorage } from '@angular/fire/storage';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-admin-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-category.html',
  styleUrl: './admin-category.scss',
})
export class AdminCategory {
  private app = inject(FirebaseApp);
  private storage = getStorage(this.app);
  public isUploading = signal(false);
  public isSubmitting = signal(false);
  private fb = inject(NonNullableFormBuilder);
  private snackBar = inject(MatSnackBar);

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.isUploading.set(true);

    try {
      const filePath = `categories/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      this.form.patchValue({ imageUrl: url });
      this.snackBar.open('Изображение загружено!', 'OK', { duration: 2000 });
    } catch (error) {
      console.error(error);
      this.snackBar.open('Ошибка при загрузке фото', 'Упс');
    } finally {
      this.isUploading.set(false);
    }
  }

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    imageUrl: ['', [Validators.required]],
  });

  private categoryService = inject(CategoryService);
  categories$ = this.categoryService.getCategories();

  async add() {
    if (this.form.invalid || this.isUploading() || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const { name, imageUrl } = this.form.getRawValue();

    try {
      await this.categoryService.addCategory(name, imageUrl);
      this.form.reset();
      this.snackBar.open('Категория добавлена', 'OK', { duration: 2000 });
    } catch (error) {
      console.error(error);
      this.snackBar.open('Ошибка при добавлении категории', 'Упс');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  delete(id: string) {
    if (confirm('Вы уверены, что хотите удалить эту категорию?')) {
      this.categoryService.deleteCategory(id);
    }
  }
}
