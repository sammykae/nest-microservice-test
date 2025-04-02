import { Injectable } from '@nestjs/common';
import {
  ClientCreateBookDto,
  ClientUpdateBookDto,
} from '@app/contracts/books/books.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  async findAllBooks() {
    try {
      return await this.bookRepo
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.user', 'author')
        .getMany();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOneBook(id: number) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!book) {
      throw new RpcException({
        statusCode: 404,
        message: `Book with ID ${id} not found`,
      });
    }
    return book;
  }

  async createBook(createBookDto: ClientCreateBookDto) {
    const book = this.bookRepo.create(createBookDto);
    return await this.bookRepo.save(book);
  }

  async updateBook(id: number, updateBookDto: ClientUpdateBookDto) {
    const book = await this.bookRepo.findOneBy({ id });

    if (!book) {
      throw new RpcException({
        statusCode: 404,
        message: `Book with ID ${id} not found`,
      });
    }

    const res = await this.bookRepo.update(id, updateBookDto);

    if (res.affected > 0) {
      return updateBookDto;
    } else {
      throw new RpcException({
        statusCode: 400,
        message: `An error occured updating you book`,
      });
    }
  }

  async deleteBook(id: number) {
    const res = await this.bookRepo.delete({ id });

    if (res.affected > 0) {
      return { message: 'Book deleted successfully' };
    } else {
      throw new RpcException({
        statusCode: 404,
        message: `Book not found`,
      });
    }
  }
}
