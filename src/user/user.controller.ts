import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ApiUseTags, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from '../multer.middleware';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor(
            'userImage',
            // upload,
        ),
    )
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'userImage' })
    postFlower(
        @Body() createUserDto: CreateUserDto,
        @UploadedFile() file,
    ): any {
        console.log(file);
        if (!file) {
            throw new BadRequestException('Please Insert Image');
        }
        console.log('controller here');
        const userData = this.userService.postUser(
            {
                ...createUserDto,
                userImage: `http://localhost:3000/${file.path}`,
            });
        return userData;
    }

}
