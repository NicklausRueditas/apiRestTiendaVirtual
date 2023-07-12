import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';

@Injectable()
export class JwtAuthService {
    constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user: User): string {
    const payload = { sub: user.id, name: user.displayName }; // Define el contenido del token, por ejemplo, el ID del usuario

    return this.jwtService.sign(payload); // Genera el token firmado con la clave secreta configurada
  }

  verifyJwtToken(token: string): any {
    try {
      return this.jwtService.verify(token); // Verifica y decodifica el token, devolviendo su contenido
    } catch (error) {
      return null; // Si el token no es válido, retorna null
    }
  }
}
