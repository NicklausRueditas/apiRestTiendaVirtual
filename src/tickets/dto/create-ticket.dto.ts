import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './order/create-order.dto';// Asegúrate de importar el DTO de OrderItem
import { Client } from '../schemas/clients/client.schema';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  worker: string;

  @IsNotEmpty()
  @IsString()
  client: Client;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orders: CreateOrderItemDto[];

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
