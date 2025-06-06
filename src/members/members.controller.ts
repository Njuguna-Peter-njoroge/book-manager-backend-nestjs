import { Members } from './interfaces/membersinterface'; 
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

import { MembersService } from './members.service'; 
import { createMembersDto } from './dtos/createmembbers.dtos'; 
import { updateMembersDto } from './dtos/updatemembers.dtos'; 

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: createMembersDto): ApiResponse<Members> {
    try {
      const member = this.membersService.create(data);
      return {
        success: true,
        message: 'member added successfully',
        data: member,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add an member',
        error: error.message,
      };
    }
  }

  @Get()
  findAll(@Query('available') available?: string): ApiResponse<Members[]> {
    try {
      let authors: Members[];

      if (available === 'true') {
        authors = this.membersService.findAll();
      } else {
        authors = this.membersService.findAll();
      }

      return {
        success: true,
        message: `${authors.length}  retrieved successfully`,
        data: authors,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve member',
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
  findOne(@Param('id', ParseIntPipe) id: number): ApiResponse<Members> {
    try {
      const user = this.membersService.findOne(id);
      return {
        success: true,
        message: ' author found',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: 'member Not found',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Find book by title
   * GET /authors/title/:title
   */
  @Get('name/:name')
  findByname(@Param('name') name: string): ApiResponse<Members> {
    try {
      const members = this.membersService.findByname(name);
      return {
        success: true,
        message: 'member By name found',
        data: members,
      };
    } catch (error) {
      return {
        success: false,
        message: 'member with name not found',
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
    @Body() data:updateMembersDto,
  ): ApiResponse<Members> {
    try {
      const user = this.membersService.update(id, data);
      return {
        success: true,
        message: 'member info updated succesfully',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update member info',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Checkout a member (soft delete)
   * DELETE /member/:id
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.membersService.remove(id);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove member',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  /**
   * Permanently delete an author(hard delete)
   * DELETE /member/:id/permanent
   */
  @Delete(':id/permanent')
  delete(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.membersService.delete(id);

      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to hard delete member',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }
}
