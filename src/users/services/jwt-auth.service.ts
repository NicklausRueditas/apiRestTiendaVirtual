import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user: User): string {
    const payload = {
      sub: user._id, // Usamos el campo "_id" del usuario como identificador único (asegúrate de que sea el mismo campo que usaste en el esquema de usuario)
      name: user.displayName,
      roles: user.roles, // Incluimos los roles del usuario en el token
      permissions: user.permissions, // Incluimos los permisos del usuario en el token
    };

    return this.jwtService.sign(payload); // Genera el token firmado con la clave secreta configurada en el módulo de JWT
  }

  verifyJwtToken(token: string): any {
    try {
      return this.jwtService.verify(token); // Verifica y decodifica el token, devolviendo su contenido
    } catch (error) {
      return null; // Si el token no es válido, retorna null
    }
  }
}
