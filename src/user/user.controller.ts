import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Res,
  Req,
  Put,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInfoDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async create(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.create(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: any) {
    const { userInfo, access_token } = await this.userService.loginUser(
      loginUserDto,
    );
    const response = {
      access_token: access_token,
      userInfo: {
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        supervisor: userInfo.supervisor,
      },
    };

    res.json(response);
  }

  @Get('users')
  @UseGuards(AuthGuard())
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Put('user')
  @UseGuards(AuthGuard())
  async updateUser(@Body() user: UserInfoDto, @Res() res: any) {
    const { name, email, supervisor } = await this.userService.updateUser(user);
    res.json({ name, email, supervisor });
  }
}
