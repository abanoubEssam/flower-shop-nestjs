import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { upload } from '../multer.middleware';
import { Roles } from '../utils/Guard/roles.decorator';
import { RolesGuard } from '../utils/Guard/roles.guard';
import { Request } from 'express';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HandleImgsInterceptor, UploadField, handleImgsFieldsMiddleware } from './interceptors/multer.interceptor';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    static getImgsFields = (options = { isUpdate: false }): UploadField[] => [
        { name: 'userImage', maxCount: 1, optional: options.isUpdate, resizeOptions: { thumbnail: true } },
    ]

    @Post()
    @UseGuards(RolesGuard)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FilesInterceptor(
            handleImgsFieldsMiddleware(UserController.getImgsFields()) as any,
            // upload,
        ),
    )
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
