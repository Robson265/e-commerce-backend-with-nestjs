import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categories";
import { Vendor } from "./vendor.entity";

@Entity()

export class Product{

    @PrimaryGeneratedColumn('uuid')
    id?: string;
    
    @Column()
    productName: string;
    
    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    quantity: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @ManyToOne(() => Vendor, (vendor) => vendor.product)
    vendor: Vendor; 
}