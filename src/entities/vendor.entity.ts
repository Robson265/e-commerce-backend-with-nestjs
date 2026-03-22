import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()

export class Vendor{
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    vendorName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;
    
    @OneToMany(()=> Product, (product)=> product.vendor)
    product: Product[];


}


