import { IsNotEmpty, IsString } from "class-validator";

export class CreateProduct{
    
    @IsString()
    @IsNotEmpty()
    vendorName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}