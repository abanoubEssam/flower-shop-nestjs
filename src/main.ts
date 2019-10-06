import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerD } from './utils/swagger';
import * as express from 'express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads' , express.static(path.join(__dirname, '..', 'uploads')));
  swaggerD(app);
  await app.listen(port, () => {
    console.log(`listening on port ${port} ......`);
  });
}
bootstrap();
