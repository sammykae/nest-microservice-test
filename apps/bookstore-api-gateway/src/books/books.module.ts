import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PORTS } from 'apps/constants';
import { BOOKS_PATTERN } from '@app/contracts/books/books.patterns';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BOOKS_PATTERN.CLIENT_NAME,
        transport: Transport.TCP,
        options: {
          port: PORTS.BOOKS,
        },
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
