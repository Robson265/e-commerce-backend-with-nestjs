import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { Order } from 'src/entities/order';
import { OrderItem } from 'src/entities/orderItem';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){}


    async createOrder(userId: string, createorderdto: CreateOrderDto){
        let totalAmount = 0;
        const orderItems: OrderItem[] = [];


        for (const item of createorderdto.items){
            const product = await this.productRepository.findOne({
                where: {id: item.productId},
            });

            if (!product){
                throw new NotFoundException(`Product ${item.productId} not found`);
            }
        }
    }

}
