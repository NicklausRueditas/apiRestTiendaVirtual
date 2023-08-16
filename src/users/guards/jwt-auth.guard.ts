import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Agrega tu lógica de autenticación personalizada aquí
    // Por ejemplo, llama a super.logIn(request) para establecer una sesión.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Puedes lanzar una excepción basada en los argumentos "info" o "err"
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // Verifica que el token tenga la propiedad 'roles' y el sub (id) del usuario
    if (!user.roles || !user.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}