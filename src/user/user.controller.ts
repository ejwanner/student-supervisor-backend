  
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

    constructor(private usersService: UserService) {

    }

    @Post() 
    async create(@Body() registerUserDto: RegisterUserDto) {
        return await this.usersService.create(registerUserDto);
    }

    // This route will require successfully passing our default auth strategy (JWT) in order
    // to access the route
    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute(){
        return {
            message: 'You did it!'
        }
    }

}