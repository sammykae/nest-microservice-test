import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ClientCreateUserDto,
  ClientUpdateUserDto,
} from '@app/contracts/users/users.dto';
import { CreateUserDto } from './dto/user.dto';
import { USERS_PATTERN } from '@app/contracts/users/users.patterns';

@Injectable()
export class UsersService {
  // Inject Microservice client
  constructor(
    @Inject(USERS_PATTERN.CLIENT_NAME) private usersClient: ClientProxy,
  ) {}

  findAll() {
    return this.usersClient.send<string, any>(USERS_PATTERN.FIND_ALL, {});
  }

  async findOne(id: any) {
    return this.usersClient.send<string, number>(USERS_PATTERN.FIND_ONE, id);
  }

  createUser(userData: CreateUserDto) {
    return this.usersClient.send<string, ClientCreateUserDto>(
      USERS_PATTERN.CREATE_USER,
      userData,
    );
  }

  updateUser(id: number, updateUserDto: ClientUpdateUserDto) {
    return this.usersClient.send<string, ClientUpdateUserDto>(
      USERS_PATTERN.UPDATE_USER,
      { ...updateUserDto, id },
    );
  }

  deleteUser(id: number) {
    return this.usersClient.send<string, number>(USERS_PATTERN.DELETE_USER, id);
  }
}
