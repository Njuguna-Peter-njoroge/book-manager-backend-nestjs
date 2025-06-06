// import { create } from 'domain';
// import { ApiResponse } from 'src/shared/interfaces/api-response/api-response.interface';

// import { BooksService } from './books.service';
// import { Books } from './interfaces/books.interface';
// import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

// import { createBooksDto } from './dtos/create.books.dtos';

// import { measureMemory } from 'vm';
// import { get } from 'http';

// @Controller('books')
// export class BooksController {
//       BooksService: any;
//       constructor(private readonly Books: BooksService){}
      
//       /**
//        * add a new book
//        *POST/users
       
//        body{'title, author,id }
// */

// @Post () 
// @HttpCode(HttpStatus.CREATED)
// create(@Body() data: createBooksDto): ApiResponse <Books>{
//       try{
//             const book = this.BooksService.create(data);
//             return{
//                   succes:true,
//                   message:"book added successfully",
//                   data:book,
//             }
            
//       }
//       catch(error){
//       return {
//             succes:false,
//             message:"failed to add a book",
//             error:error.message,

//       }
// }
// }
// /**
//  * gel all books
//  * GET /BOOKS? is avaibable=true;
//  */

// findAll(@Query('available') available?:string): ApiResponse<Books[] {
//       try{
//             let books:Books[];

//             if(available==='available') {
//         books = books.BooksService.findAvailable();

//             }
//             else{
//                   books.this.BooksService.findAll();
//             }
//       }
// }>

// }



import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';

import { Books } from './interfaces/books.interface'
import { createBooksDto } from './dtos/create.books.dtos';
import { updateBooksDto } from './dtos/update.books.dtos';
import { BooksService } from './books.service';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: createBooksDto): ApiResponse<Books> {
    try {
      const book = this.booksService.create(data);
      return {
        success: true,
        message: 'Book added successfully',
        data: book,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add a book',
        error: error.message,
      };
    }
  }

  @Get()
  findAll(@Query('available') available?: string): ApiResponse<Books[]> {
    try {
      let books: Books[];

      if (available === 'true') {
        books = this.booksService.findAvailable();
      } else {
        books = this.booksService.findAll();
      }

      return {
        success: true,
        message: `${books.length}  retrieved successfully`,
        data: books,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve books',
        error: error.message,
      };
    }
  }

/***
 * get book by id
 * 
 * GET /books/:id
 */
@Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ApiResponse<Books> {
    try {
      const user = this.booksService.findOne(id);
      return {
        success: true,
        message: ' book found',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: 'book Not found',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Find book by title
   * GET /users/title/:title
   */
  @Get('title/:title')
  findBytitle(@Param('title') title: string): ApiResponse<Books> {
    try {
      const Books = this.booksService.findBytitle(title);
      return {
        success: true,
        message: 'book By title found',
        data: Books,
      };
    } catch (error) {
      return {
        success: false,
        message: 'book with title not found',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Update book 
   * PATCH users/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data:updateBooksDto,
  ): ApiResponse<Books> {
    try {
      const user = this.booksService.update(id, data);
      return {
        success: true,
        message: 'book info updated succesfully',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update books info',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Checkout a user (soft delete)
   * DELETE /book/:id
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.booksService.remove(id);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove book',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  /**
   * Permanently delete a book (hard delete)
   * DELETE /books/:id/permanent
   */
  @Delete(':id/permanent')
  delete(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.booksService.delete(id);

      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to hard delete book',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }
}
