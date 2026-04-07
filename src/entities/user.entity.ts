import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Order } from "./order";
import { Role } from "src/auth/common/enums/role.enum";
import { RefreshToken } from "./refresh-token.entity";

@Entity()

export class User{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @CreateDateColumn() createdAt: Date;
    
    @UpdateDateColumn() updatedAt: Date;

    @OneToOne(()=>Cart,(cart)=> cart.user, { nullable: true})
    cart: Cart | null;

    @OneToMany(()=>Order,(order)=> order.user)
    orders: Order[];

    @OneToMany(() => RefreshToken, token => token.user) refreshTokens: RefreshToken[];

}


