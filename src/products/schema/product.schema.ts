import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SpecsProduct, SpecsProductsSchema } from './specs-product.schema';
import { isValidObjectId } from 'mongoose';

export type ProductDocument = Product & Document

@Schema({ timestamps: true })
export class Product {

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
    specifications: SpecsProduct;

    @Prop()
    price: number;

    @Prop({ type: [String], required: true })
    category: string[];

    @Prop()
    stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);