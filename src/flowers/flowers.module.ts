import { Module } from '@nestjs/common';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowerSchema } from './flower.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Flower', schema: FlowerSchema }]),
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
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule { }
