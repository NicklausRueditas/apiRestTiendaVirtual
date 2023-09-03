import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SpecsProductsDocument = SpecsProduct & Document;

@Schema()
export class SpecsProduct {

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

export const SpecsProductsSchema = SchemaFactory.createForClass(SpecsProduct);