import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmpty } from 'class-validator';

export class UpdateFlowerDto {

    @ApiModelProperty(
        {
            required: false,
        },
    )
    title: string;

    @ApiModelProperty(
        {
            required: false,
        },
    )
    description: string;

    @ApiModelProperty(
        {
            required: false,
        },
    )
    price: number;

    @ApiModelProperty(
        {
            required: false,
        },
    )
    flowerImage: string;
}
