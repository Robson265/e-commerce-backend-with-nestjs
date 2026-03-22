import { IsNotEmpty, IsString } from "class-validator";


export class AddCartItemDto{

    @IsString()
    @IsNotEmpty()
    quantity: string;
}
