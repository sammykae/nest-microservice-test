import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PORTS } from 'apps/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORTS.USERS,
      },
    },
  );
  await app.listen();
  console.log('User service started on port ', PORTS.USERS);
}
bootstrap();
