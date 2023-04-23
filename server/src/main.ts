import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      credentials: true,
    });
    app.use(cookieParser());
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {}
}

start();
