import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "src/auth/common/enums/role.enum";


export class RegisterUser{

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}