  
import { Controller, Get, Post, Body, UseGuards, HttpCode, Res, Req } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';

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
        const jwt = await this.userService.loginUser(loginUserDto);
        res.json({
            access_token: jwt,
        })
    }

    @Get('users')
    @UseGuards(AuthGuard())
    async findAllUsers(@Req() req: any){
        console.log(req.user);
        return await this.userService.findAllUsers();
    }

}