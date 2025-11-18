import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless from '@vendia/serverless-express';

let cachedServer;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverless({ app: expressApp });
}

// Vercel requires a *default export* that is a function
export default async function handler(req, res) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(req, res);
}
