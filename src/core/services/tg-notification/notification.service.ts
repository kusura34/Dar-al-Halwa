import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Используем HttpClient вместо fetch (так правильнее в Angular)
import { CartItem } from '../../../shared/models/cart-Item.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TgNotificationService {
  private http = inject(HttpClient);

  // Сюда вставляешь URL, который выдал Firebase после деплоя твоей функции!
// Твой реальный URL функции из панели Firebase
private functionUrl = 'https://dar34116600211-dzi22vd6xq-uc.a.run.app';

  async sendOrder(form: any, items: CartItem[], total: number): Promise<any> {
    // 1. Формируем список товаров (перевели на HTML-теги <b> для совместимости с функцией)
    const itemsList = items
      .map(item => `🎂 <b>${item.name}</b> x${item.quantity} — ${item.price * item.quantity}₽`)
      .join('\n');

    // 2. Собираем красивый текст сообщения
    const message = `
🔔 <b>НОВЫЙ ЗАКАЗ</b>

👤 <b>Клиент:</b> ${form.name}
📞 <b>Тел:</b> ${form.phone}
📍 <b>Город:</b> ${form.city}
📅 <b>Дата:</b> ${form.date}

🛍 <b>Состав заказа:</b>
${itemsList}

💰 <b>ИТОГО: ${total}₽</b>
`;

    try {
      // 3. Отправляем этот текст в Cloud Function
      // firstValueFrom превращает Observable от http.post в Promise, чтобы работал async/await
      const response = await firstValueFrom(
        this.http.post(this.functionUrl, { message: message })
      );
      return response;
    } catch (error) {
      console.error('Ошибка при вызове Cloud Function:', error);
      throw error;
    }
  }
}