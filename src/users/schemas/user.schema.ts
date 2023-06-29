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
}

export const UserSchema = SchemaFactory.createForClass(User);