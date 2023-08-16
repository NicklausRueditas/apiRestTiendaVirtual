import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Crear un nuevo usuario
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Obtener todos los usuarios (solo para el rol 'admin')
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

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

  // Obtener un usuario por ID (para admin y usuario correspondiente)
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user', 'worker')
  async findOne(@Param('id') id: string, @Request() req: any) {
    // Verificar si el usuario autenticado coincide con el ID en la ruta
    if (req.user.sub !== id && !req.user.roles.includes('admin')) {
      throw new ForbiddenException('Access denied'); // No es el dueño del perfil
    }

    return this.usersService.findById(id);
  }

  // Actualizar un usuario por ID (para admin y usuario correspondiente)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user', 'worker')
  async update(@Param('id') id: string, @Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    // Verificar si el usuario autenticado coincide con el ID en la ruta
    if (req.user.sub !== id && !req.user.roles.includes('admin')) {
      throw new ForbiddenException('Access denied'); // No es el dueño del perfil
    }

    return this.usersService.update(id, updateUserDto);
  }

  // Eliminar un usuario por ID (solo para el rol 'admin')
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}