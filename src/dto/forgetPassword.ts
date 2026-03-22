import { IsNotEmpty, IsString } from "class-validator";

export class ForgetPassword{

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}