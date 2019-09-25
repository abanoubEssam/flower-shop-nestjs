import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateFlowerDto {

    @ApiModelProperty()
    title: string;

    @ApiModelProperty()
    description: string;

    @ApiModelProperty()
    price: number;

}
