import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity()

export class CartItem{
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('int')
    quantity: number;

    @ManyToOne(()=> Cart, (cart) => cart.items, { onDelete: 'CASCADE'})
    cart: Cart;

    @ManyToOne(()=> Product)
    product: Product;

}


