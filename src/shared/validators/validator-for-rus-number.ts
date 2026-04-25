import { AbstractControl } from '@angular/forms';

export function russianPhoneValidator(control: AbstractControl) {
  const raw = control.value;
  if (!raw) return null;

  const digits = raw.replace(/\D/g, '');

  // ожидаем 7XXXXXXXXXX (11 цифр)
  if (!/^7\d{10}$/.test(digits)) {
    return { russianPhone: true };
  }

  // защита от 77777777777 или 00000000000
  if (/^(\d)\1+$/.test(digits)) {
    return { repeatedDigits: true };
  }

  return null;
}
