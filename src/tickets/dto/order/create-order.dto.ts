import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/products/schema/product.schema';


export class CreateOrderItemDto {
  
  @IsString()
  product: Product; // Puedes cambiar el tipo a string si el ID del producto es una cadena

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}