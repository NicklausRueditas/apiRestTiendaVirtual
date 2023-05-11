import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ImagesDocument = Images & Document;

@Schema({ timestamps: true })
export class Images {

    @Prop({ type: String, default: uuidv4 })
    _id: string;

    @Prop()
    filename: string;

    @Prop()
    mimetype: string;

    @Prop()
    size: number;

    @Prop()
    url: string;

    @Prop()
    codigo: string;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);