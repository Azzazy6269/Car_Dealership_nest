import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptor/serialize.interceptor';
import { UserDTO } from './dto/userSerialize.dto';

@Serialize(UserDTO)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ){}

    @Post('/register')
    async createUser(@Body() body:CreateUserDto){
        const user= await this.usersService.create(body.email,body.password)
        return user
    }

    @Get('/:id')
    async findOne(@Param('id',ParseIntPipe) id:number){
        try{
            const user= await this.usersService.findOneById(id);
            return user
        }catch(error:any){
            if (error.message === "user not found") {
                throw new NotFoundException({
                    success: false,
                    error: error.message
                });
            } else {
                throw new BadRequestException({
                    success: false,
                    error: error.message
                });
            }
        }
    }

    @Get('/')
    async findAll(){
        const users= await this.usersService.findAll();
        return users
    }
    
    @Patch('/:id')
    async updateUser(@Param('id',ParseIntPipe) id:number,@Body() body:UpdateUserDTO){
        try{
            const user= await this.usersService.updateUser(id,body);
            return user
        }catch(error:any){
            if (error.message === "user not found") {
                throw new NotFoundException({
                    success: false,
                    error: error.message
                });
            } else {
                throw new BadRequestException({
                    success: false,
                    error: error.message
                });
            }
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id',ParseIntPipe) id:number){
        try{
            const {deleted}= await this.usersService.delete(id);
            return {deleted}
        }catch(error:any){
            if (error.message === "user not found") {
                throw new NotFoundException({
                    success: false,
                    error: error.message
                });
            } else {
                throw new BadRequestException({
                    success: false,
                    error: error.message
                });
            }
        }
    }
}
