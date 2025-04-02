import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export class ClientCreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  age: number;
}

export class ClientUpdateUserDto extends PartialType(ClientCreateUserDto) {
  id: number;
}
