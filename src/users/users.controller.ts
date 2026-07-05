import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ){}

    @Post('/register')
    async createUser(@Body() body:CreateUserDto){
        const user= await this.usersService.create(body.email,body.password)
        return {
            success:true,
            data:{user}
        }
    }

    @Get('/:id')
    async findOne(@Param('id',ParseIntPipe) id:number){
        try{
            const user= await this.usersService.findOneById(id);
            return {
                success:true,
                data:{user}
            }
        }catch(error:any){
            return {
                success:false,
                error
            }
        }
    }

    @Get('/')
    async findAll(){
        const users= await this.usersService.findAll();
        return {
            success:true,
            data:{users}
        }
    }
    
    @Patch('/:id')
    async updateUser(@Param('id',ParseIntPipe) id:number,@Body() body:UpdateUserDTO){
        try{
            const user= await this.usersService.updateUser(id,body);
            return {
                success:true,
                data:{user}
            }
        }catch(error:any){
            return {
                success:false,
                error
            }
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id',ParseIntPipe) id:number){
        try{
            const deleted= await this.usersService.delete(id);
            return {
                success:true,
                data:{deleted}
            }
        }catch(error:any){
            return {
                success:false,
                error
            }
        }
    }
}
