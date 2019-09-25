import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { ApiUseTags, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@ApiUseTags('flowers')
@Controller('flowers')
export class FlowersController {
    constructor(private readonly flowersService: FlowersService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('flowerImage'))
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'flowerImage'})
    addFlower(
        @UploadedFile() file,
        @Body() createFlowerDto: CreateFlowerDto,
    ): any {
        console.log(file);
        console.log('controller here');
        const flowerData = this.flowersService.inserFlower(createFlowerDto);
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
        @Body() updateFlowerDto: UpdateFlowerDto,
        @Param('id') flowerId: string,
    ) {
        const updatedFlower =  this.flowersService.updateFlowerById(flowerId, updateFlowerDto);
        return updatedFlower;
    }

    @Delete(':id')
    removeFlower(@Param('id') flowerId: string) {
        this.flowersService.deleteFlower(flowerId);
        return null;
    }
}
