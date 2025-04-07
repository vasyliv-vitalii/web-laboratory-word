import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  // Зчитуємо сертифікат та ключ
  const httpsOptions = {
    key: fs.readFileSync('D:\\web_labs\\labs-work\\web-laboratory-word\\lab_1\\localhost-key.pem'),
    cert: fs.readFileSync('D:\\web_labs\\labs-work\\web-laboratory-word\\lab_1\\localhost.pem'),
    minVersion: 'TLSv1.2', // Встановлюємо мінімальну версію TLS на 1.2
    maxVersion: 'TLSv1.2', // Встановлюємо максимальну версію TLS на 1.2
    ciphers: [
      'TLS_RSA_WITH_AES_256_CBC_SHA256',
      'TLS_RSA_WITH_AES_256_CBC_SHA',
    ].join(':'),
    honorCipherOrder: true, // Забезпечує використання вказаних шифрів у заданому порядку
  };

  // Створюємо NestJS додаток з HTTPS
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  // Слухаємо на порту 3000
  await app.listen(3000);
}

bootstrap();
