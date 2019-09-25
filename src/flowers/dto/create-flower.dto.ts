import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty, ApiConsumes } from '@nestjs/swagger';

export class CreateFlowerDto {

    @IsNotEmpty()
    @ApiModelProperty()
    title: string;

    @IsNotEmpty()
    @ApiModelProperty()
    description: string;

    @IsNotEmpty()
    @ApiModelProperty()
    price: number;

    @IsNotEmpty()
    @ApiModelProperty()
    flowerImage: string;

}
