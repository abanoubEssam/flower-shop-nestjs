import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiImplicitFile, ApiUseTags } from '@nestjs/swagger';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { FlowersService } from './flowers.service';
import { upload } from '../multer.middleware';
@ApiUseTags('flowers')
@Controller('flowers')
export class FlowersController {
    constructor(private readonly flowersService: FlowersService) { }

    @Post()
    @UseInterceptors(FileInterceptor('flowerImage', upload,
    ))
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'flowerImage' })
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
        const updatedFlower = this.flowersService.updateFlowerById(flowerId, updateFlowerDto);
        return updatedFlower;
    }

    @Delete(':id')
    removeFlower(@Param('id') flowerId: string) {
        this.flowersService.deleteFlower(flowerId);
        return null;
    }
}
