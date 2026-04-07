import { IsEnum } from "class-validator";
import { OrderStatus } from "src/entities/order";

export class UpdareOrderDto{
    
    @IsEnum(OrderStatus)
    items: OrderStatus;

}