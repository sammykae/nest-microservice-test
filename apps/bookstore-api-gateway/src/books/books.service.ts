import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { BOOKS_PATTERN } from '@app/contracts/books/books.patterns';
import {
  ClientCreateBookDto,
  ClientUpdateBookDto,
} from '@app/contracts/books/books.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject(BOOKS_PATTERN.CLIENT_NAME) private readonly bookClient: ClientProxy,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookClient.send<string, ClientCreateBookDto>(
      BOOKS_PATTERN.CREATE_BOOK,
      createBookDto,
    );
  }

  async findAll() {
    return this.bookClient.send<string, any>(BOOKS_PATTERN.FIND_ALL, {});
  }

  async findOne(id: number) {
    return this.bookClient.send<string, number>(BOOKS_PATTERN.FIND_ONE, id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookClient.send<string, ClientUpdateBookDto>(
      BOOKS_PATTERN.UPDATE_BOOK,
      {
        ...updateBookDto,
        id,
      },
    );
  }

  remove(id: number) {
    return this.bookClient.send<string, number>(BOOKS_PATTERN.DELETE_BOOK, id);
  }
}
