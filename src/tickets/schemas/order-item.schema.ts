import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from 'src/products/schema/product.schema';


@Schema()
export class OrderItem extends Document {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true }) // Referencia al esquema Products
  product: Product;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalPrice: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);