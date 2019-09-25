import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('flowers')
@Controller('flowers')
export class FlowersController {
    constructor(private readonly flowersService: FlowersService) { }

    @Post()
    addFlower(
        @Body('title') flowerTitle: string,
        @Body('description') flowerDesc: string,
        @Body('price') flowerPrice: number,
    ): any {
        console.log('controller here');
        const flowerData = this.flowersService.inserFlower(flowerTitle, flowerDesc, flowerPrice);
        return flowerData;
    }

    @Get()
    getAllFlowers() {
        const flowersData = this.flowersService.getAllFlowers();
        return flowersData;
    }

    @Get(':id')
    getFlowerByID(@Param('id') flowerId: string) {
        const flower = this.flowersService.getFlowerById(flowerId);
        console.log("TCL: FlowersController -> getFlowerByID -> flower", flower);
        return flower;
    }

    @Patch(':id')
    updateFlower(
        @Param('id') flowerId: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ) {
        this.flowersService.updateFlowerById(flowerId, title, description, price);
        return null;
    }

    @Delete(':id')
    removeFlower(@Param('id') flowerId: string) {
        this.flowersService.deleteFlower(flowerId);
        return null;
    }
}
