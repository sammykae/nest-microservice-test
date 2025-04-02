import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ClientCreateUserDto,
  ClientUpdateUserDto,
} from '@app/contracts/users/users.dto';
import { USERS_PATTERN } from '@app/contracts/users/users.patterns';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERN.FIND_ALL)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(USERS_PATTERN.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern(USERS_PATTERN.CREATE_USER)
  createUser(@Payload() creatUserData: ClientCreateUserDto) {
    return this.usersService.createUser(creatUserData);
  }

  @MessagePattern(USERS_PATTERN.UPDATE_USER)
  updateUser(@Payload() updateUserDto: ClientUpdateUserDto) {
    return this.usersService.updateUser(updateUserDto.id, updateUserDto);
  }

  @MessagePattern(USERS_PATTERN.DELETE_USER)
  deleteUser(@Payload() id: number) {
    return this.usersService.deleteUser(id);
  }
}
