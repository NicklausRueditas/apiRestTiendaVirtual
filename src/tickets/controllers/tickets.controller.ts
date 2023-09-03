import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  @Get('all')
  async findAll() {
    const tickets = await this.ticketsService.findAll();
    return tickets;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const ticket = await this.ticketsService.findById(id);
    if (!ticket) {
      throw new NotFoundException('Ticket no encontrado.');
    }
    return ticket;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    const updatedTicket = await this.ticketsService.update(id, updateTicketDto);
    if (!updatedTicket) {
      throw new NotFoundException('Ticket no encontrado para actualizar.');
    }
    return updatedTicket;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedTicket = await this.ticketsService.remove(id);
    if (!removedTicket) {
      throw new NotFoundException('Ticket no encontrado para eliminar.');
    }
    return removedTicket;
  }
}
