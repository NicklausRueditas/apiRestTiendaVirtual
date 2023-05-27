import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SpecsProducts, SpecsProductsSchema } from './specs-products.schema';
import { v4 as uuidv4 } from 'uuid';

export type ProductsDocument = Products & Document;

@Schema({timestamps: true})
export class Products {

  @Prop({ type: String, default: uuidv4 })
    _id: string;

  @Prop({ unique: true, length: 6 })
  code: string;

  @Prop({ minlength: 2 })
  name: string;

  @Prop({ minlength: 2 })
  brand: string;

  @Prop({ minlength: 2 })
  model: string;

  @Prop({ minlength: 10 })
  description: string;

  @Prop({ type: SpecsProductsSchema })
  specifications:SpecsProducts;

  @Prop()
  price: number;

  @Prop({ type: [String], required: true })
  category: string[];

  @Prop()
  stock: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);