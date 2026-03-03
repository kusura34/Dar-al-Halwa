import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { CartItem } from '../../../shared/models/cart-Item.model';

@Injectable({
  providedIn: 'root',
})
export class TgNotificationService {
    
  sendOrder(form: any, items: CartItem[], total: number) {
    const token = environment.telegram.botToken;
    const chatId = environment.telegram.chatId;

    // список тортов
    const itemsList = items
      .map(item => `🎂 ${item.name} x${item.quantity} — ${item.price * item.quantity}₽`)
      .join('\n');

    const message = `
🔔 *НОВЫЙ ЗАКАЗ*

👤 *Клиент:* ${form.name}
📞 *Тел:* ${form.phone}
📍 *Город:* ${form.city}
📅 *Дата:* ${form.date}

🛍 *Состав заказа:*
${itemsList}

💰 *ИТОГО: ${total}₽*
`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  }
}