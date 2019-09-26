import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Flower } from './flower.interface';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import * as omit from 'omit-empty';
@Injectable()
export class FlowersService {

    constructor(@InjectModel('Flower') private readonly flowerModel: Model<Flower>) { }

    async inserFlower(createFlowerDto: CreateFlowerDto): Promise<Flower> {
        const createdFlower = await this.flowerModel.create(createFlowerDto);
        console.log("TCL: FlowersService -> constructor -> createdFlower", createdFlower);
        return createdFlower;
    }

    async getAllFlowers(): Promise<Flower[]> {
        return await this.flowerModel.find();
    }

    async getFlowerById(flowerId: string): Promise<Flower> {
        const flower = await this.flowerModel.findById(flowerId);
        if (!flower) {
            throw new NotFoundException('there is no flower with that id');
        }
        console.log("TCL: FlowersService -> constructor -> flower", flower);
        return flower;
    }

    async updateFlowerById(flowerId: string, updateFlowerDto: UpdateFlowerDto): Promise<Flower> {
        const checkExist = await this.flowerModel.findById(flowerId);
        if (!checkExist) {
            throw new NotFoundException('Flower Not Found');
        }
        const incomingBody = omit(updateFlowerDto);
        console.log("TCL: FlowersService -> constructor -> incomingBody", incomingBody);
        console.log("TCL: FlowersService -> constructor -> checkExist", checkExist);
        const updateFlower = await this.flowerModel.findByIdAndUpdate({ _id: flowerId }, incomingBody, { new: true });
        if (!updateFlower) {
            throw new NotFoundException('this flower not exist');
        }
        return updateFlower;
    }

    async deleteFlower(flowerId: string) {
        await this.flowerModel.findByIdAndRemove({ _id: flowerId });
    }

}
