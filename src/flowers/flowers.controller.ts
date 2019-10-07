import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, Req } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiImplicitFile, ApiUseTags } from '@nestjs/swagger';
import { upload } from '../multer.middleware';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Flower } from './flower.interface';
import { FlowersService } from './flowers.service';
import { RolesGuard } from '../utils/Guard/roles.guard';

@ApiBearerAuth()
@ApiUseTags('flowers')
@Controller('flowers')
export class FlowersController {
    constructor(private readonly flowersService: FlowersService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor(
            'flowerImage',
            // upload,
        ),
    )
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'flowerImage' })
    async addFlower(
        @Body() createFlowerDto: CreateFlowerDto,
        @UploadedFile() file,
    ): Promise<Flower> {
        console.log(file);
        if (!file) {
            throw new BadRequestException('Please Insert Image');
        }
        console.log('controller here');
        const flowerData = this.flowersService.inserFlower({
            ...createFlowerDto,
            flowerImage: `http://localhost:3000/${file.path}`,
        });
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
        FileInterceptor(
            'flowerImage',
            upload,
        ),
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
