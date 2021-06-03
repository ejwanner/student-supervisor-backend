import { IsEmail, IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  supervisor: boolean;
}
