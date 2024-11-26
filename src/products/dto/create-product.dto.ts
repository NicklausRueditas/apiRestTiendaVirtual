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
    @IsNotEmpty() // Marca el campo brand como requerido
    model?: string;
  
    @IsString()
    @IsOptional() // La descripción es opcional
    description?: string;
  
    @IsArray()
    @IsString({ each: true }) // Cada elemento del array debe ser un string
    @IsOptional() // Las especificaciones son opcionales
    specifications?: string[];
  
    @IsString()
    @IsOptional() // El color es opcional
    color?: string;
  
    @IsString()
    @IsOptional() // El tamaño es opcional
    size?: string;
  
    @IsArray()
    @IsString({ each: true })
    @IsOptional() // Las características son opcionales
    characteristics?: string[];
  
    @IsString()
    @IsOptional() // El material es opcional
    material?: string;
  
    @IsArray()
    @IsString({ each: true })
    @IsOptional() // Las dimensiones son opcionales
    dimension?: string[];
  
    @IsString()
    @IsOptional() // El peso es opcional
    weight?: string;
  
    @IsString()
    @IsOptional() // La capacidad es opcional
    ability?: string;
  
    @IsNumber()
    @IsPositive() // El precio debe ser un número positivo
    @IsNotEmpty() // Marca el campo brand como requerido
    price?: number;
  
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
    @IsNotEmpty() // Marca el campo brand como requerido
    stock?: number;
}
