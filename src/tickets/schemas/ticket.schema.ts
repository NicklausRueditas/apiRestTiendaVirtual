import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './order-item.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from './clients/client.schema';


export type TicketDocument = Ticket & Document

@Schema({ timestamps: true })

export class Ticket extends Document {

  @Prop({ required: true })
  worker: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true }) // Referencia al esquema Client
  client: Client;

  @Prop({ type: [OrderItemSchema] })
  orders: OrderItem[];

  @Prop({ required: true })
  amount: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);