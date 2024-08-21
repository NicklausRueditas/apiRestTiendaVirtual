import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import * as mongoose from 'mongoose'
import { env } from 'process';

export type ImagesDocument = Images & Document;

@Schema({ timestamps: true })
export class Images {
  
    @Prop({unique: true})
    idLink: string;

    @Prop()
    mimetype: string;

    @Prop()
    size: number;

    @Prop({ default: '' })
    url: string;

}

const ImagesSchema = SchemaFactory.createForClass(Images);

ImagesSchema.pre<ImagesDocument>('save', function (next) {
  if (!this.url) {
    this.url = `${env.URL}/image/${this.idLink}`;
  }
  next();
});

export const ImagesModel = mongoose.model<ImagesDocument>('Images', ImagesSchema);

export { ImagesSchema }
