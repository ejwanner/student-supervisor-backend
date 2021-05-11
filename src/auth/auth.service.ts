import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService){}

    async validateUserByPassword(loginAttempt: LoginUserDto) {

        // This will be used for the initial login
        let userToAttempt = await this.userService.findOneByEmail(loginAttempt.email);
        
        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
    
                if(err) throw new UnauthorizedException();
    
                if(isMatch){
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));
    
                } else {
                    throw new UnauthorizedException();
                }
    
            });

        });

    }

    async validateUserByJwt(payload: JwtPayload) { 

        // This will be used when the user has already logged in and has a JWT
        let user = await this.userService.findOneByEmail(payload.email);

        if(user){
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user){

        let data = {
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt            
        }

    }

}