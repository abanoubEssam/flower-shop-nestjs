import { Module } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import * as autoIncrement from 'mongoose-auto-increment';
import * as mongoose from 'mongoose';
@Module({
  imports: [
    FlowersModule,
    MongooseModule.forRootAsync({
      useFactory:  () => {
        return {
          uri: 'mongodb://localhost/flowers-with-nest',
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/upload',
      }),
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
