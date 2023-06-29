import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

    @Prop()
    displayName: string;

    @Prop()
    email: string;

    @Prop()
    profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);