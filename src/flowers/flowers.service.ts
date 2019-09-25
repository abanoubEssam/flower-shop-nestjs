import { Injectable, NotFoundException } from '@nestjs/common';
import { Flowers } from './flowers.model';
@Injectable()
export class FlowersService {
    private flowers: Flowers[] = [];
    inserFlower(title: string, desc: string, price: number) {
        const flowerId = new Date().toISOString();
        const newFlower = new Flowers(flowerId, title, desc, price);
        console.log('service here');

        this.flowers.push(newFlower);
        console.log("TCL: FlowersService -> inserFlower -> flowers", this.flowers);
        return newFlower;
    }

    getAllFlowers() {
        return this.flowers;
    }

    getFlowerById(flowerId: string) {
        const flower = this.flowers.find((flow) => flow.id === flowerId);
        if (!flower) {
            throw new NotFoundException("Coud't found flower");
        }
        return { ...flower };
    }

    async updateFlowerById(flowerId: string, title: string, desc: string, price: number) {
        const [flower, index] = this.findFlower(flowerId);
        const updateFlower = { ...flower };
        if (title) {
            updateFlower.title = title;
        }
        if (desc) {
            updateFlower.desc = desc;
        }
        if (price) {
            updateFlower.price = price;
        }
        this.flowers[index] = updateFlower;
    }

    deleteFlower(flowerId: string) {
        const index = this.findFlower(flowerId)[1];
        this.flowers.splice(index, 1);
    }

    private findFlower(id: string): [Flowers, number] {
        const flowerIndex = this.flowers.findIndex((flow) => flow.id === id);
        const flower = this.flowers[flowerIndex];
        if (!flower) {
            throw new NotFoundException("Coud't found flower");
        }
        return [flower, flowerIndex];
    }
}
