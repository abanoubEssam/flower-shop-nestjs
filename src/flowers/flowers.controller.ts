import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, Req } from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiImplicitFile, ApiUseTags } from '@nestjs/swagger';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Flower } from './flower.interface';
import { FlowersService } from './flowers.service';
import { Request } from 'express';
import { HandleImgsInterceptor, UploadField } from '../multer.interceptor';
@ApiBearerAuth()
@ApiUseTags('flowers')
@Controller('flowers')
export class FlowersController {
    constructor(private readonly flowersService: FlowersService) { }
    static getImgsFields = (options = { isUpdate: false }): UploadField[] => [
        { name: 'flowerImage', maxCount: 1, optional: options.isUpdate, resizeOptions: { thumbnail: true } },
    ]
    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            FlowersController.getImgsFields(),
        ),
        HandleImgsInterceptor(FlowersController.getImgsFields()),
    )
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'flowerImage' })
    async addFlower(
        @Body() createFlowerDto: CreateFlowerDto,
    ): Promise<Flower> {
        console.log("TCL: FlowersController -> constructor -> createFlowerDto", createFlowerDto)
        console.log('controller here');
        const flowerData = this.flowersService.inserFlower(createFlowerDto);
        return flowerData;
    }

    @Get()
    getAllFlowers(@Req() req: Request) {
        const flowersData = this.flowersService.getAllFlowers();
        console.log(req.headers);
        return flowersData;
    }

    @Get(':id')
    getFlowerByID(@Param('id') flowerId: string) {
        const flower = this.flowersService.getFlowerById(flowerId);
        console.log("TCL: FlowersController -> getFlowerByID -> flower", flower);
        return flower;
    }

    @Patch(':id')
    @UseInterceptors(
        FileFieldsInterceptor(
            FlowersController.getImgsFields(),
        ),
        HandleImgsInterceptor(FlowersController.getImgsFields()),
    )
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'flowerImage' })
    updateFlower(
        @UploadedFile() file,
        @Body() updateFlowerDto: UpdateFlowerDto,
        @Param('id') flowerId: string,
    ) {
        let updatedFlower: any;
        if (file) {
            updatedFlower = this.flowersService.updateFlowerById(
                flowerId,
                {
                    ...updateFlowerDto,
                    flowerImage: `http://localhost:3000/${file.path}`,
                },
            );
        }
        if (!file) {
            updatedFlower = this.flowersService.updateFlowerById(flowerId, updateFlowerDto);

        }
        return updatedFlower;

    }

    @Delete(':id')
    removeFlower(@Param('id') flowerId: string) {
        this.flowersService.deleteFlower(flowerId);
        return null;
    }
}
