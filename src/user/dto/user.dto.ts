import { IsEmail, IsString } from 'class-validator';

export class UserInfoDto {
  _id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  supervisor: boolean;

}
