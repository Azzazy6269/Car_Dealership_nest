import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDTO{
    @IsEmail()
    @IsString()
    @IsOptional()
    email:string
}