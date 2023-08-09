import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {

    @Prop()
    googleId: string;

    @Prop()
    displayName: string;

    @Prop()
    email: string;

    @Prop()
    profilePicture: string;

    @Prop()
    password: string;

    @Prop({ default: ['user'] }) // Valor predeterminado 'user' para nuevos usuarios
    roles: string[]; // Array de roles asignados al usuario

    @Prop({ default: [] })
    permissions: string[]; // Array de permisos específicos del usuario
}

export const UserSchema = SchemaFactory.createForClass(User);