import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('manage')
export class ManageController {
  constructor(private readonly usersService: UsersService) { }

  // Crear un nuevo usuario
  @Post('user/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Obtener todos los usuarios (solo para el rol 'admin')
  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {

    return this.usersService.findAll();
  }

  // Obtener un usuario por ID (para admin y usuario correspondiente)
  @Get('user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findOne(@Param('id') id: string, @Request() req: any) {

    return this.usersService.findById(id);
  }

  // Actualizar un usuario por ID (para admin y usuario correspondiente)
  @Patch('user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Request() req: any, @Body() updateUserDto: UpdateUserDto) {

    return this.usersService.update(id, updateUserDto);
  }

  // Eliminar un usuario por ID (solo para el rol 'admin')
  @Delete('user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {

    return this.usersService.remove(id);
    
  }
}