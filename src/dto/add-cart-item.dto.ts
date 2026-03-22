import { IsNotEmpty, IsString } from "class-validator";


export class AddCartItemDto{

    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    quantity: string;
}
