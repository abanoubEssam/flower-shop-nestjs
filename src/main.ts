import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerD } from './swagger';
import * as express from 'express';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.use('/uploads' , express.static(path.join(__dirname, '..', 'uploads')));
  swaggerD(app);
  await app.listen(port, () => {
    console.log(`listening on port ${port} ......`);
  });
}
bootstrap();
