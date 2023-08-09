import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Si no se especifican roles requeridos, se permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return false; // Si el token no está presente en la solicitud, se deniega el acceso
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const user: User = decodedToken; // Suponiendo que el token contiene la información del usuario

      if (!user || !user.roles) {
        return false; // Si el usuario no tiene roles, se deniega el acceso
      }

      return requiredRoles.some((role) => user.roles.includes(role));

    } catch (error) {
      return false; // Si el token no es válido, se deniega el acceso
    }
  }
}