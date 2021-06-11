import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateThesisDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsBoolean()
  @IsNotEmpty()
  is_billed: boolean;

  @IsString()
  secondSupervisorId: string;
}