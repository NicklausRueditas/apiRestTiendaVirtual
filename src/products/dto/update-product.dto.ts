import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    
  @IsString()
  @IsOptional()
  @Length(6, 6) // Valida que el código tenga exactamente 6 caracteres si se proporciona
  code?: string;
}
