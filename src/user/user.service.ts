import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../dist/user/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userrModel: Model<User>) { }

    async postUser(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt(10);

        const createUser = await this.userrModel.create(
            {
                ...createUserDto,
                password: await bcrypt.hash(createUserDto.password, salt),
                userImage: {
                    original: createUserDto.userImage.original,
                    thumbnail: createUserDto.userImage.thumbnail,
                },
            },
        );
        return createUser;
    }
}
