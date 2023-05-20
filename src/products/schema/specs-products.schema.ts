import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type SpecsProductsDocument = SpecsProducts & Document;

@Schema()
export class SpecsProducts {

    @Prop({ type: String, default: uuidv4 })
    _id: string;

    @Prop({ minlength: 3 })
    color: string;

    @Prop({ minlength: 2 })
    size: string;

    @Prop({ type: [String] })
    characteristics: string[];

    @Prop()
    material: string;

    @Prop({ type: [String] })
    dimension: string[];

    @Prop()
    weight: string;

    @Prop()
    ability: string;
}

export const SpecsProductsSchema = SchemaFactory.createForClass(SpecsProducts);