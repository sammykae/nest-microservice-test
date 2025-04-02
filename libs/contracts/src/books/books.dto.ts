import { PartialType } from '@nestjs/mapped-types';

export class BookDto {
  id: number;
  title: string;
  rating: number;
}

export class ClientCreateBookDto {
  title: string;
  rating: number;
}

export class ClientUpdateBookDto extends PartialType(ClientCreateBookDto) {
  id: number;
}
