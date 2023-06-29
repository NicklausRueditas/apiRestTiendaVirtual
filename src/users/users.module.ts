import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controller/users.controller';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ])
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, GoogleStrategy]
})
export class UsersModule {}
