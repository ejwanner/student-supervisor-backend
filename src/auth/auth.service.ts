import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: User) {
    return this.jwtService.sign({ user });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async validatePasswords(password: string, storedPasswordHash: string) {
    return await bcrypt.compare(password, storedPasswordHash);
  }
}
