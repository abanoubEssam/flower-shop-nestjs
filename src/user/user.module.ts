import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { MulterModule } from '@nestjs/platform-express';
// import * as multer from 'multer';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './uploads'
          , filename: (req, file, cb) => {
            cb(null, file.originalname);
          },
        }),
        // storage: multer.memoryStorage(),

      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
