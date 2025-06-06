import { create } from 'domain';
import { Members } from './interfaces/membersinterface';
import { createMembersDto } from './dtos/createmembbers.dtos';
import { updateMembersDto } from './dtos/updatemembers.dtos';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { rename } from 'fs';


@Injectable()
export class MembersService {
       private members: Members[]=[

            {   
               
       id:1,
      name:"Justin",
      role:"main character",
 },
          {   
               id:2,
      name:"Grace",
      role:"Minor character",
      },
      ];

      private nextId = 3;

      create( data: createMembersDto): Members {
        const existingMember = this.members.find(
  (member) => member.name === data.name
);

            if(existingMember){
                  throw new ConflictException(
                        `member with title ${data.name} already exists`,
                  )
            }
            const newMember : Members = {
                  id: Number(this.nextId++),

                  ...data,
 
            };
      this.members.push(newMember);
      return newMember;
}
// find all

findAll (): Members[]{
return this.members;
}
// find available

findAvailable():Members[] {
      return this.members.filter((members) =>members.isAvailable);
}
// find one
findOne(id:number): Members{
      const member =this.members.find((members) => member.id===id);
      if(!member){
            throw new NotFoundException(`member with id ${id} not found`);
      }
      return member;

}
findByname(name: string): Members{
      const member = this.members.find((members) => member.
      name===name);
      if(!member){
            throw  new NotFoundException(`member with  the name  ${name} not found`);
      }
      return member;
}


update(id:number, data:updateMembersDto): Members {
      const memberIndex = this.members.findIndex((member) => member.id === id);
      if(memberIndex === -1) {
            throw new NotFoundException(`member with id${id} not found`);

      }
    const updatedmembers = {
      ...this.members[memberIndex],
     ... data,

    };
    this.members[memberIndex] = updatedmembers;
    return updatedmembers;
    
    }

    //soft delete

    remove(id:number): {message:string} {
      const memberIndex = this.members.findIndex((member) => member.id === id);
      if(memberIndex===-1){
            throw new NotFoundException(`member with id${id} not found`);
      }
    
      

      return{
message:`member ${this.members[memberIndex].name} has been deactivated successfully`,
      };

    }


    delete(id:number): {message:string} {
      const bookIndex = this.members.findIndex((books) => books.id ===id);
      if(bookIndex === -1){
            throw new NotFoundException(` mamber with id ${id} not found `);
          
      }
                  const deleletemember = this.members.splice(bookIndex, 1)[0];
                 return {
                  message: `member ${deleletemember.name} has been deleted successfully`,
            };
    }
}


function findAll() {
      throw new Error('Function not implemented.');
}
 