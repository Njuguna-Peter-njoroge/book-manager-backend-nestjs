import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsService {
      delete(id: number) {
            throw new Error('Method not implemented.');
      }
      remove(id: number) {
            throw new Error('Method not implemented.');
      }
      update(id: number, data: updateBooksDto) {
            throw new Error('Method not implemented.');
      }
      findBytitle(title: string) {
            throw new Error('Method not implemented.');
      }
      findOne(id: number) {
            throw new Error('Method not implemented.');
      }
      findAll(): import("./interfaces/author.interface").Authors[] {
            throw new Error('Method not implemented.');
      }
      findAvailable(): import("./interfaces/author.interface").Authors[] {
            throw new Error('Method not implemented.');
      }
      create(data: createBooksDto) {
            throw new Error('Method not implemented.');
      }
}
