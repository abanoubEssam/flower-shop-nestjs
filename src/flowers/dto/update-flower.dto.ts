import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateFlowerDto {

    @ApiModelProperty()
    title: string;

    @ApiModelProperty()
    description: string;

    @ApiModelProperty()
    price: number;

}
