import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../dist/user/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userrModel: Model<User>) { }

    async postUser(createUserDto: CreateUserDto): Promise<User> {
        const createUser = await this.userrModel.create(createUserDto);
        return createUser;
    }
}
