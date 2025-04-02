import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: { id: string }) {
    return this.userService.findOne(+param.id);
  }

  @Post()
  createUser(@Body() createUserData: CreateUserDto) {
    return this.userService.createUser(createUserData);
  }

  @Patch(':id')
  updateUser(
    @Param() param: { id: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(+param.id, updateUserDto);
  }
  @Delete(':id')
  deleteUser(@Param() param: { id: string }) {
    return this.userService.deleteUser(+param.id);
  }
}
