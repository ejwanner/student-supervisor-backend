import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async create(createUserDto: RegisterUserDto) {
        let createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({email: email});
    }
}