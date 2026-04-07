import { IsNotEmpty, IsString } from "class-validator";


export class AddToCartDto{

    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    quantity: string;
}
