import { Controller } from '@nestjs/common';
import { BooksService } from './books.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ClientCreateBookDto,
  ClientUpdateBookDto,
} from '@app/contracts/books/books.dto';
import { BOOKS_PATTERN } from '@app/contracts/books/books.patterns';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern(BOOKS_PATTERN.FIND_ALL)
  findAllBooks() {
    return this.booksService.findAllBooks();
  }

  @MessagePattern(BOOKS_PATTERN.FIND_ONE)
  findOneBook(@Payload() id: number) {
    return this.booksService.findOneBook(id);
  }

  @MessagePattern(BOOKS_PATTERN.CREATE_BOOK)
  createBook(@Payload() createBookDto: ClientCreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @MessagePattern(BOOKS_PATTERN.UPDATE_BOOK)
  updateBook(@Payload() updateBookDto: ClientUpdateBookDto) {
    return this.booksService.updateBook(updateBookDto.id, updateBookDto);
  }

  @MessagePattern(BOOKS_PATTERN.DELETE_BOOK)
  deleteBook(@Payload() id: number) {
    return this.booksService.deleteBook(id);
  }
}
