import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

interface ResizedImage {
    original: string;
    thumbnail: string;
}
export class CreateUserDto {

    @IsNotEmpty()
    @ApiModelProperty()
    name: string;

    @IsNotEmpty()
    @ApiModelProperty()
    age: number;

    @ApiModelProperty({
        format: 'email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ApiModelProperty()
    password: string;

    @IsNotEmpty()
    @ApiModelProperty()
    userImage: ResizedImage;

}
