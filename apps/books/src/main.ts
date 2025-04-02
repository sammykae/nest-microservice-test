import { NestFactory } from '@nestjs/core';
import { BooksModule } from './books.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PORTS } from 'apps/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksModule,
    {
      transport: Transport.TCP,
      options: { port: PORTS.BOOKS },
    },
  );
  await app.listen();
  console.log('Books service running on port ', PORTS.BOOKS);
}
bootstrap();
