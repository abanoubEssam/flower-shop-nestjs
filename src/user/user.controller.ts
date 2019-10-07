import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiImplicitFile, ApiUseTags } from '@nestjs/swagger';
import { HandleImgsInterceptor, UploadField } from '../multer.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
@ApiUseTags('user')
@Controller('user')
export class UserController {

    static getImgsFields = (options = { isUpdate: false }): UploadField[] => [
        { name: 'userImage', maxCount: 1, optional: options.isUpdate, resizeOptions: { thumbnail: true } },
    ]

    constructor(private readonly userService: UserService) { }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            UserController.getImgsFields(),
        ),
        HandleImgsInterceptor(UserController.getImgsFields()),
    )
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'userImage' })
    async postFlower(
        @Body() createUserDto: CreateUserDto,
        // @UploadedFile() file,
    ): Promise<User> {
        const userData = this.userService.postUser(createUserDto);
        const resData = await userData;
        console.log("TCL: UserController -> constructor -> userData", resData);
        return resData;
    }

}
