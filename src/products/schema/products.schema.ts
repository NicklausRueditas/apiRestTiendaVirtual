import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  @Prop({ unique: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);