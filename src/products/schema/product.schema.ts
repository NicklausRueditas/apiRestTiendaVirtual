import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document

@Schema({ timestamps: true })  // timestamps agrega campos de createdAt y updatedAt automáticamente
export class Product {

    @Prop({ required: true,unique: true, length: 6 })  // Se asegura que el código sea único y tenga una longitud específica
    code: string;

    @Prop({required: true,  minlength: 2 })  // Requiere que el nombre tenga al menos 2 caracteres
    name: string;

    @Prop({ required: true })  // Marca el campo brand como requerido
    brand: string;

    @Prop({required: true})
    model: string;  // Campo opcional para el modelo del producto

    @Prop()
    description: string;  // Campo opcional para la descripción del producto

    @Prop({ type: [String] })  // Especificaciones en formato de arreglo de strings
    specifications: string[];

    @Prop()
    supplier: string;

    @Prop()
    color: string;

    @Prop()
    size: string;

    @Prop()
    information: string;  // Campo opcional para la información del producto

    @Prop({required: true})
    price: number;  // Campo opcional para el precio del producto, podrías agregar validaciones como min y max

    @Prop({ type: [String], required: true })  // Categoría es requerida y en formato de arreglo de strings
    category: string[];

    @Prop({ type: [String], required: true })  // Galería es requerida y en formato de arreglo de strings
    gallery: string[];

    @Prop({required: true})
    stock: number;  // Campo opcional para la cantidad en stock, podrías agregar validaciones como min
}

export const ProductSchema = SchemaFactory.createForClass(Product);  // Crea el esquema de mongoose a partir de la clase