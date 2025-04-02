import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
}
