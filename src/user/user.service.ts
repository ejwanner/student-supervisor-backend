import { Model } from 'mongoose';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInfoDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    const mailNotExists = await this.mailNotExists(registerUserDto.email);
    if (mailNotExists) {
      registerUserDto.password = await this.authService.hashPassword(
        registerUserDto.password,
      );
      const user = new this.userModel(registerUserDto);
      return user.save();
    } else {
      throw new HttpException('Email already in use!', HttpStatus.CONFLICT);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginUserDto.email);
    if (user) {
      const isEqual = await this.authService.validatePasswords(
        loginUserDto.password,
        user.password,
      );
      if (!isEqual) {
        throw new HttpException(
          'The password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const jwt = await this.authService.generateJwt(user);
      return { userInfo: user, access_token: jwt };
    } else {
      throw new HttpException(
        'Login was not successful',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findAllUsers() {
    return this.userModel.find();
  }

  async updateUser(user: UserInfoDto) {
    return this.userModel.findOneAndUpdate({ email: user.email }, user, {
      new: true,
    });
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async findSecondSupervisor(user: User) {
    return new Promise((resolve, reject) => {
      this.userModel.find({'preferredCategory': user.preferredCategory, 'supervisor': true})
        .then(items => {
          resolve(items);
        })
        .catch(err => {
          reject(err);
        })
    })
    return this.userModel.find({'preferredCategory': user.preferredCategory, 'supervisor': true})
      .then(items => {
        return items;
      })
      .catch(err => {
        console.log(err);
      })
  }

  private mailNotExists(email: string) {
    return new Promise(async (resolve, reject) => {
      this.userModel.findOne({ email: email }, function (err, user) {
        if (err) {
          reject(new Error('Server Error'));
        }
        if (Boolean(user)) {
          reject(new Error('E-Mail already in use!'));
        }
        resolve(true);
      });
    });
  }

}
