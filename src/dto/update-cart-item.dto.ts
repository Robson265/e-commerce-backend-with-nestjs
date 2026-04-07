import { IsNotEmpty, IsString } from "class-validator";


export class UpdateCartDto{

    @IsString()
    @IsNotEmpty()
    quantity: string;
}

//git init
//git add .
//git commit -m "initial commit"
//git remote add orgin https://github.com/Robson265/e-commerce-backend-with-nestjs.git
//git branch -M main
//git push -u origin main