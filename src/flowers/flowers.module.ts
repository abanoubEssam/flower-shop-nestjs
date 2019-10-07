import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowerSchema } from './flower.schema';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Flower', schema: FlowerSchema }]),
  ],
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule { }
