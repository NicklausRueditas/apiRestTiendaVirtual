import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MinLength } from "class-validator"

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @Length(6, 6) // Valida que el código tenga exactamente 6 caracteres
    code: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(2) // Valida que el nombre tenga al menos 2 caracteres
    name: string;
  
    @IsString()
    @IsNotEmpty() // Marca el campo brand como requerido
    brand: string;
  
    @IsString()
    @IsNotEmpty() // Marca el campo model como requerido
    model: string;
  
    @IsString()
    @IsOptional() // La descripción es opcional
    description?: string;

    @IsString()
    @IsNotEmpty()
    supplier: string;
  
    @IsArray()
    @IsString({ each: true }) // Cada elemento del array debe ser un string
    @IsOptional() // Las especificaciones son opcionales
    specifications?: string[];
  
    @IsString()
    @IsNotEmpty()
    color: string;
  
    @IsString()
    @IsNotEmpty()
    size: string;
  
    @IsString()
    @IsOptional() // La información es opcional
    information?: string;
  
    @IsNumber()
    @IsPositive() // El precio debe ser un número positivo
    @IsNotEmpty() // Marca el campo brand como requerido
    price: number;
  
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1) // Al menos una categoría debe ser proporcionada
    category: string[];
  
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1) // Al menos una imagen en la galería debe ser proporcionada
    gallery: string[];
  
    @IsNumber()
    @IsPositive() // El stock debe ser un número positivo
    @IsNotEmpty()
    stock: number;
}
