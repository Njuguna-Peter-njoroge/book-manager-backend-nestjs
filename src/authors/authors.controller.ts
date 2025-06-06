import { Authors } from './interfaces/author.interface';
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

import { AuthorsService } from './authors.service';
import { createauthorsDto } from './dtos/createauthor.dtos';
import { updateauthorsDto } from './dtos/updateauthor.dtos';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: createauthorsDto): ApiResponse<Authors> {
    try {
      const author = this.authorsService.create(data);
      return {
        success: true,
        message: 'author added successfully',
        data: author,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add an author',
        error: error.message,
      };
    }
  }

  @Get()
  findAll(@Query('available') available?: string): ApiResponse<Authors[]> {
    try {
      let authors: Authors[];

      if (available === 'true') {
        authors = this.authorsService.findAll();
      } else {
        authors = this.authorsService.findAll();
      }

      return {
        success: true,
        message: `${authors.length}  retrieved successfully`,
        data: authors,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve authors',
        error: error.message,
      };
    }
  }

/***
 * get author by id
 * 
 * GET /author/:id
 */
@Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ApiResponse<Authors> {
    try {
      const user = this.authorsService.findOne(id);
      return {
        success: true,
        message: ' author found',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: 'author Not found',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Find book by title
   * GET /authors/title/:title
   */
  @Get('title/:title')
  findBytitle(@Param('title') title: string): ApiResponse<Authors> {
    try {
      const authors = this.authorsService.findBytitle(title);
      return {
        success: true,
        message: 'author By title found',
        data: authors,
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
   * Update author
   * PATCH author/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data:updateauthorsDto,
  ): ApiResponse<Authors> {
    try {
      const user = this.authorsService.update(id, data);
      return {
        success: true,
        message: 'author info updated succesfully',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update author info',
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
      const result = this.authorsService.remove(id);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove author',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  /**
   * Permanently delete an author(hard delete)
   * DELETE /books/:id/permanent
   */
  @Delete(':id/permanent')
  delete(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.authorsService.delete(id);

      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to hard delete author',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }
}
