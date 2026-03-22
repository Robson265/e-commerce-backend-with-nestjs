import { Module } from '@nestjs/common';
import { UsersModule } from './auth/users/users.module';
import { AuthModule } from './auth/auth.module';
import { User} from './entities/user.entity';
import { Product} from './entities/product.entity';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { VendorModule } from './vendor/vendor.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UsersModule,
        ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Product],
        synchronize: true,

    })
  }),

    AuthModule,

    OrderModule,

    ProductsModule,

    CartModule,

    VendorModule,

    CategoryModule
  ],

})
export class AppModule {}
