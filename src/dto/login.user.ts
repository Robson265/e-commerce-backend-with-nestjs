import { IsNotEmpty, IsString } from "class-validator";

 export class LoginUser{

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}