import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';

import { ImagesModule } from '../images/images.module';
import { Products, ProductsSchema  } from './schema/products.schema';
import { Images, ImagesSchema } from '../images/schema/images.schema';

@Module({
  imports:[
    ImagesModule,
    MongooseModule.forFeature([
      {
        name: Images.name,
        schema: ImagesSchema,
      },
      {
        name: Products.name,
        schema: ProductsSchema
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}