import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document

@Schema({ timestamps: true })
export class Client extends Document {

    @Prop({ required: true, unique: true })
    dni: string;

    @Prop({ required: true })
    displayName: string;

    @Prop({ required: true })
    phone: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);