import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateThesisDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;
}