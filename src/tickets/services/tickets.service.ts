import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../schemas/ticket.schema';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { ClientsService } from './clients.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,

    private clientsService: ClientsService,
    private productsService: ProductsService,
  ) { }

  // Función para crear un ticket
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    try {
      // Asignar el ID del cliente al ticket si es una cadena
      if (typeof createTicketDto.client === 'string') {
        const client = await this.clientsService.findById(createTicketDto.client);
        if (!client) {
          throw new NotFoundException('Cliente no encontrado.');
        }
        createTicketDto.client = client['_id']
      }

      // Verificar si hay órdenes y procesarlas
      if (!createTicketDto.orders || createTicketDto.orders.length === 0) {
        throw new NotFoundException('No se proporcionaron órdenes.');
      }

      // Rellenar automáticamente los IDs de los productos usando solo los IDs
      for (const order of createTicketDto.orders) {
        if (typeof order.product === 'string') {
          const product = await this.productsService.findById(order.product);
          if (!product) {
            throw new NotFoundException(
              `Producto con ID ${order.product} no encontrado.`,
            );
          }
          order.product = product['_id']
        }
      }

      // Crear el ticket
      const createdTicket = new this.ticketModel(createTicketDto);
      return await createdTicket.save();
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      throw new Error('Error al crear el ticket.');
    }
  }

  // Función para obtener todos los tickets
  async findAll(): Promise<Ticket[]> {
    try {
      return await this.ticketModel.find().exec();
    } catch (error) {
      throw new Error('Error al obtener todos los tickets.');
    }
  }

  // Función para obtener un ticket por su ID
  async findById(id: string): Promise<Ticket | null> {
    try {
      return await this.ticketModel.findById(id).exec();
    } catch (error) {
      throw new Error('Error al obtener el ticket por ID.');
    }
  }

  // Función para actualizar un ticket por su ID
  async update(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket | null> {
    try {
      const updatedTicket = await this.ticketModel
        .findByIdAndUpdate(id, updateTicketDto, { new: true })
        .exec();
      return updatedTicket;
    } catch (error) {
      throw new Error('Error al actualizar el ticket.');
    }
  }

  // Función para eliminar un ticket por su ID
  async remove(id: string): Promise<Ticket | null> {
    try {
      const removedTicket = await this.ticketModel.findByIdAndRemove(id).exec();
      return removedTicket;
    } catch (error) {
      throw new Error('Error al eliminar el ticket.');
    }
  }
}
