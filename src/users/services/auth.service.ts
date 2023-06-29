import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  async handleGoogleAuthCallback(profile: any): Promise<User> {
    const existingUser = await this.userModel.findOne({ googleId: profile.id }).exec();
    if (existingUser) {
      // El usuario ya está registrado, no se crea un nuevo registro
      return existingUser;
    }
    const newUser = new this.userModel({
      displayName: profile.displayName,
      email: profile.emails[0].value,
      profilePicture: profile.photos[0].value,
    });

    return newUser.save();
  }
}