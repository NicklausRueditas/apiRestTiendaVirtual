import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';

import * as mongoose from 'mongoose'
import { env } from 'process';

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

    @Prop({ default: '' })
    url: string;

    @Prop()
    codigo: string;

}

const ImagesSchema = SchemaFactory.createForClass(Images);

ImagesSchema.pre<ImagesDocument>('save', function (next) {
  if (!this.url) {
    this.url = `${env.URL}/images/${this.filename}`;
  }
  next();
});

export const ImagesModel = mongoose.model<ImagesDocument>('Images', ImagesSchema);

export { ImagesSchema }
