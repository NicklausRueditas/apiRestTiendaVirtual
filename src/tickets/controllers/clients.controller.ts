import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto } from '../dto/client/create-client.dto';
import { UpdateClientDto } from '../dto/client/update-client.dto';


@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientsService.create(createClientDto);
  }

  @Get('all')
  async findAll() {
    const clients = await this.clientsService.findAll();
    return clients;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const client = await this.clientsService.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente no encontrado.');
    }
    return client;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    const updatedClient = await this.clientsService.update(id, updateClientDto);
    if (!updatedClient) {
      throw new NotFoundException('Cliente no encontrado para actualizar.');
    }
    return updatedClient;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedClient = await this.clientsService.remove(id);
    if (!removedClient) {
      throw new NotFoundException('Cliente no encontrado para eliminar.');
    }
    return removedClient;
  }
}