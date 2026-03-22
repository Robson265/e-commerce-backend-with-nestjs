import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product.entity";

@Entity()

export class OrderItem{
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    quantity: string;

    @Column()
    price: string;

    @ManyToOne(()=> Order, (order)=> order.items, {onDelete: 'CASCADE'})
    order: Order;

    @ManyToOne(()=> Product)
    product: Product;

    //orderid
    //productid



}


