import { Injectable, NotFoundException } from '@nestjs/common';
import { Flowers } from './flowers.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Flower } from './flower.interface';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
@Injectable()
export class FlowersService {

    constructor(@InjectModel('Flower') private readonly flowerModel: Model<Flower>) { }

    async inserFlower(createFlowerDto: CreateFlowerDto): Promise<Flower> {
        const createdFlower = new this.flowerModel(createFlowerDto);
        return await createdFlower.save();
    }

    async getAllFlowers(): Promise<Flower[]> {
        // return this.flowers;
        return await this.flowerModel.find();
    }

    async getFlowerById(flowerId: string): Promise<Flower> {
        const flower = await this.flowerModel.findById(flowerId);
        console.log("TCL: FlowersService -> constructor -> flower", flower);
        return flower;
    }

    async updateFlowerById(flowerId: string, updateFlowerDto: UpdateFlowerDto): Promise<Flower> {
        const afterUpdate = await this.flowerModel.findByIdAndUpdate({ _id: flowerId }, updateFlowerDto , {new: true});
        return afterUpdate;
    }

    deleteFlower(flowerId: string) {
        // const index = this.findFlower(flowerId)[1];
        // this.flowers.splice(index, 1);
    }

}
