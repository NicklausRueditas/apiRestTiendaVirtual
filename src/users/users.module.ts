import { Module } from '@nestjs/common';

import { ManageController } from './controllers/manage.controller';
import { AuthController } from './controllers/auth.controller';

import { GoogleStrategy } from './strategy/google.strategy';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { JwtAuthService } from './services/jwt-auth.service';

import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './constants/jwt.constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SesionController } from './controllers/sesion.controller';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret, // Reemplaza con tu clave secreta real
      signOptions: { expiresIn: '6h' }, // Configura el tiempo de expiración del token según tus necesidades
    })
  ],
  controllers: [ManageController, AuthController, SesionController],
  providers: [UsersService, AuthService, GoogleStrategy,JwtAuthService,JwtStrategy]
})
export class UsersModule {}
