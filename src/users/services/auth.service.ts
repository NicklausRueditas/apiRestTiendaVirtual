import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtAuthService } from './jwt-auth.service';


@Injectable()
export class AuthService {
  
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private readonly jwtAuthService: JwtAuthService) { }

  async handleGoogleAuthCallback(profile: any): Promise<User> {
    const existingUser = await this.userModel.findOne({ googleId: profile.id }).exec();
    if (existingUser) {
      // El usuario ya está registrado, no se crea un nuevo registro
      return existingUser;
    }
    const newUser = new this.userModel({
      googleId:profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      profilePicture: profile.photos[0].value,
    });

    return newUser.save();
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const token = this.jwtAuthService.generateJwtToken(user);
    return token;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async googleLogin(user: User): Promise<string> {
    // Implementa la lógica de inicio de sesión con Google según tus requisitos
    // Por ejemplo, puedes buscar al usuario en la base de datos o crear un nuevo usuario si no existe
    const token = this.jwtAuthService.generateJwtToken(user);
    return token;
  }


}