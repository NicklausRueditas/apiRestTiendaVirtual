import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
    return user;
  }
}