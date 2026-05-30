import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import axios from "axios";

export const dar34116600211 = onRequest(
  { 
    cors: true, 
    // Явно говорим функции подтянуть секреты, которые ты только что создал
    secrets: ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"] 
  }, 
  async (request, response) => {
    try {
      const { message } = request.body;

      if (!message) {
        response.status(400).send({ success: false, error: "Сообщение пустое" });
        return; 
      }

      // Функция сама безопасно достает их из переменных окружения
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!botToken || !chatId) {
        logger.error("Ключи Телеграма не найдены в process.env");
        response.status(500).send({ success: false, error: "Ошибка настройки секретов на сервере" });
        return;
      }

      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

      await axios.post(telegramUrl, {
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      });

      response.status(200).send({ success: true });

    } catch (error: any) {
      logger.error("Ошибка отправки в Telegram:", error);
      response.status(500).send({ success: false, error: error.message });
    }
  }
);