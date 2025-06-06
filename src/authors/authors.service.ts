import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Authors } from './interfaces/author.interface'; 
import { createauthorsDto } from './dtos/createauthor.dtos'; 
import { updateauthorsDto } from './dtos/updateauthor.dtos'; 

@Injectable()
export class AuthorsService {
  private authors: Authors[] = [
    {
      id: 1,
      name: 'john',
      book_title: 'the gamer',
      origin: 'Nairobi',
    },
    {
      id: 2,
      name: 'peter',
      book_title: 'the changer',
      origin: 'Kisumu',
    },
  ];

  private nextId = 3;

  //  Create Author
  create(data: createauthorsDto): Authors {
    const existingAuthor = this.authors.find(author => author.name === data.name);
    if (existingAuthor) {
      throw new ConflictException(`Author with name "${data.name}" already exists`);
    }

    const newAuthor: Authors = {
      id: this.nextId++,
      ...data,
    };

    this.authors.push(newAuthor);
    return newAuthor;
  }

  // Find All Authors
  findAll(): Authors[] {
    return this.authors;
  }

  //  Find Author by ID
  findOne(id: number): Authors {
    const author = this.authors.find(author => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  // Find Author by Book Title
  findBytitle(title: string): Authors {
    const author = this.authors.find(author => author.book_title === title);
    if (!author) {
      throw new NotFoundException(`Book with title "${title}" not found`);
    }
    return author;
  }

  //  Update Author
  update(id: number, data: updateauthorsDto): Authors {
    const authorIndex = this.authors.findIndex(author => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    const updatedAuthor = {
      ...this.authors[authorIndex],
      ...data,
    };

    this.authors[authorIndex] = updatedAuthor;
    return updatedAuthor;
  }

  // Soft Delete 
  remove(id: number): { message: string } {
    const authorIndex = this.authors.findIndex(author => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    return {
      message: `Author ${this.authors[authorIndex].name} has been checked out successfully`,
    };
  }

  //  Hard Delete
  delete(id: number): { message: string } {
    const authorIndex = this.authors.findIndex(author => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    const deletedAuthor = this.authors.splice(authorIndex, 1)[0];
    return {
      message: `Author ${deletedAuthor.name} has been deleted successfully`,
    };
  }
}
