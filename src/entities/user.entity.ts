import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Order } from "./order";
import { Role } from "src/auth/common/enums/role.enum";

@Entity()

export class User{
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.CUSTOMER,
    })
    role: Role;

    @OneToOne(()=>Cart,(cart)=> cart.user, { nullable: true})
    cart: Cart | null;

    @OneToMany(()=>Order,(order)=> order.user)
    orders: Order[];

}


