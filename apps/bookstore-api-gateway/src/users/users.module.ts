import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PORTS } from 'apps/constants';
import { USERS_PATTERN } from '@app/contracts/users/users.patterns';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_PATTERN.CLIENT_NAME,
        transport: Transport.TCP,
        options: { port: PORTS.USERS },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
