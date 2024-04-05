import { Controller, Get, UseGuards, Request, Patch, Body, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('sesion')
export class SesionController {
    constructor(private readonly usersService: UsersService) {}

    // Obtener el perfil del usuario autenticado
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    const userId = req.user.sub; // ID del usuario autenticado
    return this.usersService.findById(userId);
  }

   // Actualizar el perfil del usuario autenticado
   @Patch('profile')
   @UseGuards(JwtAuthGuard)
   async updateProfile(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
     const userId = req.user.sub; // ID del usuario autenticado
     return this.usersService.update(userId, updateUserDto);
   }

   // Eliminar el perfil del usuario autenticado
   @Delete('profile')
   @UseGuards(JwtAuthGuard)
   async deleteProfile(@Request() req: any) {
       const userId = req.user.sub; // ID del usuario autenticado
       return this.usersService.remove(userId);
   }
}

