import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findAllImages() {
    const products = await this.productsService.findAllJoinImages();
      return products;
  }

  @Get('date')
  async findAll() {
    const products = await this.productsService.findAll();
      return products;
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return product;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new Error('Producto no encontrado.');
    }
    return product;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productsService.update(id, updateProductDto);
      if (!updatedProduct) {
        throw new Error('Producto no encontrado para actualizar.');
      }
      return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedProduct = await this.productsService.remove(id);
      if (!deletedProduct) {
        throw new Error('Producto no encontrado para eliminar.');
      }
      return deletedProduct;
  }
}
