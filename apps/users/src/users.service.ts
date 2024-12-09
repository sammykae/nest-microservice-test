import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: Array<UserDto> = [
    {
      age: 20,
      firstName: 'John',
      id: 1,
      lastName: 'Doe',
    },
    {
      age: 20,
      firstName: 'Jane',
      id: 2,
      lastName: 'Doe',
    },
    {
      age: 5,
      firstName: 'Anna',
      id: 3,
      lastName: 'Doe',
    },
    {
      age: 3,
      firstName: 'Mike',
      id: 4,
      lastName: 'Doe',
    },
  ];

  findAll() {
    return this.users;
  }
}
