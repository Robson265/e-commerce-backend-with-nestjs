import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { CartItem } from "./cart-Item";

@Entity()

export class Cart{
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @OneToOne(()=> User, (user) => user.cart)
    @JoinColumn()
    user: User;
    items: any;

    // @OneToMany(()=> CartItem, (item) => item.cart, {cascade:true})
    // items: CartItem[];

}


