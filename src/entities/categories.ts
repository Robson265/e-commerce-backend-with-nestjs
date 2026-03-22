 import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
 
 @Entity()
 
 export class Category{
     
     @PrimaryGeneratedColumn('uuid')
     id?: string;
 
     @Column()
     categoryName: string;
 
     @Column()
     description: string; 

     products: any;

    @ManyToOne(()=> Product, (product)=> product.category)
    product: Product[];
 
 }
 
 
 