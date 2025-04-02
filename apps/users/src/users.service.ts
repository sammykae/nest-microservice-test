import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  ClientCreateUserDto,
  ClientUpdateUserDto,
} from '@app/contracts/users/users.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepo.find();
    return {
      data: users,
      message: `User${users.length > 1 ? 's' : ''} found`,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found',
      });
    }
    return { data: user, message: 'User Found' };
  }

  async createUser(userData: ClientCreateUserDto) {
    const user = this.userRepo.create(userData);
    const res = await this.userRepo.save(user);
    delete res.id;
    return { data: res, message: 'User created successfully' };
  }

  async updateUser(id: number, userData: ClientUpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found',
      });
    }

    const res = await this.userRepo.update(id, userData);
    const newData = await this.userRepo.findOneBy({ id });
    if (res.affected > 0) {
      return { data: newData, message: 'User updated successfully' };
    } else {
      throw new RpcException({
        statusCode: 400,
        message: 'An error occured updating user',
      });
    }
  }

  async deleteUser(id: number) {
    const res = await this.userRepo.delete({ id });

    if (res.affected > 0) {
      return { message: 'User deleted successfully' };
    } else {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found',
      });
    }
  }
}
