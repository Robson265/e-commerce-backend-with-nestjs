import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateProductDto{
    
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    quantity: string;

    @IsUUID()
    categoryId: string;

    @IsUUID()
    vendorId

}