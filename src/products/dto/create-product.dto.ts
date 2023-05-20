import { IsNotEmpty, IsNumber, isNumber } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty()
    code: string;
    
    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    model: string;

    description: string;

    specifications: string[];

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    category: string[];

    @IsNumber()
    @IsNotEmpty()
    stock: number;
}
