import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TgNotificationService } from '../../../core/services/tg-notification/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { russianPhoneValidator } from '../../../shared/validators/validator-for-rus-number';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  templateUrl: './order-dialog.html',
  styleUrl: './order-dialog.scss',
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
})
export class OrderDialog {
  private fb = inject(NonNullableFormBuilder);
  private dialogRef = inject(MatDialogRef<OrderDialog>);
  private tgService = inject(TgNotificationService);
  private dialogData = inject(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);

  sendOrder() {
    if (this.form.valid) {
      this.tgService
        .sendOrder(this.form.value, this.dialogData.items, this.dialogData.total)
        .then(() => {
          this.dialogRef.close(true);
        });
    }
  }

  form = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, russianPhoneValidator]],
    city: ['Казань', [Validators.required, this.kazanValidator]],
    date: ['', [Validators.required, this.dateValidator]],
  });

  kazanValidator(control: AbstractControl) {
    const value = control.value?.toLowerCase().trim();
    return value === 'казань' ? null : { notKazan: true };
  }

  dateValidator(control: AbstractControl) {
    const selected = new Date(control.value);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return selected >= tomorrow ? null : { pastDate: true };
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.snackBar.open('Заказ успешно отправлен!', 'Закрыть', {
        duration: 3000,
      });
    }
  }

  close() {
    this.dialogRef.close()
  }
}
