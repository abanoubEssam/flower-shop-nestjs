import { Module } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    FlowersModule,
    MongooseModule.forRootAsync({
      useFactory: () => {
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
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
