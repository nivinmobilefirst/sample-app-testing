import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedApp;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req, res) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }
  return cachedApp(req, res);
}
