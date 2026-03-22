import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrder{
    
    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    quantity: string;
}