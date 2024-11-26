import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';

import { ImagesModule } from '../images/images.module';
import { Product, ProductSchema } from './schema/product.schema';

@Module({
  imports:[
    ImagesModule,
    MongooseModule.forFeature([,
      {
        name: Product.name,
        schema: ProductSchema
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}