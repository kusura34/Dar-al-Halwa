import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-product-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule], 
  templateUrl: './product-add-dialog.html',
  styleUrl: './product-add-dialog.scss',
})
export class ProductAddDialog {
  private storage = inject(Storage);
  public isUploading = signal(false); // Состояние загрузки для индикатора

  // Метод для выбора и загрузки файла
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.isUploading.set(true);

    try {
      // 1. Создаем путь в хранилище (например, products/имя_файла_таймштамп)
      const filePath = `products/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);

      // 2. Загружаем файл
      await uploadBytes(fileRef, file);

      // 3. Получаем публичную ссылку
      const url = await getDownloadURL(fileRef);

      // 4. Записываем ссылку в скрытое поле формы
      this.form.patchValue({ imageUrl: url });
      
      this.snackBar.open('Изображение загружено!', 'OK', { duration: 2000 });
    } catch (error) {
      console.error(error);
      this.snackBar.open('Ошибка при загрузке фото', 'Упс');
    } finally {
      this.isUploading.set(false);
    }
}
  private fb = inject(NonNullableFormBuilder);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<ProductAddDialog>);

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(1)]],
    price: [null as number | null, [Validators.required]],
    category: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    isAvailable: [true, [Validators.required]],
    createdAt: [new Date().toISOString(), [Validators.required]],
  });

  public formSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      
      this.snackBar.open('Товар добавлен в очередь', 'OK', { duration: 3000 });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}