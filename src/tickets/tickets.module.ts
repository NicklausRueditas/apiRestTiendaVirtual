import { Module } from '@nestjs/common';
import { TicketsService } from './services/tickets.service';
import { TicketsController } from './controllers/tickets.controller';
import { ClientsService } from './services/clients.service';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { Client, ClientSchema } from './schemas/clients/client.schema';
import { ClientsController } from './controllers/clients.controller';
import { GeneratePdfService } from './reports/generate-pdf.service';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
  ],
  controllers: [TicketsController, ClientsController],
  providers: [ClientsService, TicketsService,GeneratePdfService],
  exports: [ClientsService], // Agrega esto si planeas usar ClientsService en otros módulos
})
export class TicketsModule {}
