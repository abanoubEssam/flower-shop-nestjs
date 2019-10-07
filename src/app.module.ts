import { Module } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    FlowersModule,
    UserModule,
    MongooseModule.forRootAsync({
      useFactory:  () => {
        return {
          uri: 'mongodb://localhost/flowers-with-nest',
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        };
      },
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
