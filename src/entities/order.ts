import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderItem } from "./orderItem";


export enum OrderStatus{
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

@Entity()

export class Order{
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    userId: string;

    @Column()
    totalAmount: string;
    user: any;

    @Column({type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING})
    status: OrderStatus;

    @CreateDateColumn()
    createdAt: Date;

    // @ManyToOne(()=> User, (user) => user.orders, {onDelete: 'CASCADE'})
    // user: User;

    @OneToMany(()=> OrderItem, (item)=> item.order, {cascade: true})
    items: OrderItem[];

    //createdAt
    //status (Pending, paid, shipped, delivered)


}


