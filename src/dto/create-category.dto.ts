import { IsNotEmpty, IsString } from "class-validator";

export class CreateProduct{
    
    @IsString()
    @IsNotEmpty()
    categoryName: string;

}