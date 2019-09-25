import { Module } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
