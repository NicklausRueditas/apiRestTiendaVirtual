import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  // Crea un nuevo usuario en la base de datos
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    // Verifica si ya existe un usuario con la misma dirección de correo electrónico
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash de la contraseña y creación del usuario en la base de datos
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      profilePicture: 'http://localhost:3000/image/660eec764f0589c7141690f0.png'
    });

    return newUser.save();
  }

  // Obtiene una lista de todos los usuarios
  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }

  // Obtiene un usuario por su ID
  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  // Actualiza un usuario por su ID
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Actualiza los campos si se proporcionan en el DTO
      if (updateUserDto.displayName) {
        user.displayName = updateUserDto.displayName;
      }

      if (updateUserDto.password) {
        user.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // Si el usuario es un admin, permite la actualización del campo 'roles'
      if (user.roles.includes('admin')) {
        if (updateUserDto.roles) {
          user.roles = updateUserDto.roles;
        }
      }

      // Guarda los cambios en la base de datos
      return user.save();
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  // Elimina un usuario por su ID
  async remove(id: string): Promise<void> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new Error('Error removing user');
    }
  }
}