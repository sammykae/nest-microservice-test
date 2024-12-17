import { NestFactory } from '@nestjs/core';
import { BooksModule } from './books.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksModule,
    {
      transport: Transport.TCP,
      options: { port: 8002 },
    },
  );
  await app.listen();
}
bootstrap();
