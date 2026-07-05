import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo:Repository<User>
    ){}

    async create(email:string, password:string){
        const user = await this.userRepo.create({email,password});
        return this.userRepo.save(user);
    }

    async findOneById(id:number){
        const user= await this.userRepo.findOne({where:{id}});
        if(!user){
            throw new Error('user not found');
        }
        return user;
    }

    async findAll(){
        const users= await this.userRepo.find();
        return users;
    }

    async updateUser(id:number,data:Partial<User>){
        const user= await this.userRepo.findOne({where:{id}});
        if(!user){
            throw new Error('user not found');
        }
        Object.assign(user,data);
        this.userRepo.save(user);
        return user;
    }

    async delete(id:number){
        const result = await this.userRepo.delete(id);
        if(result.affected==0){
            throw new Error('user not found');
        }
        return {deleted:true}
    }
}
