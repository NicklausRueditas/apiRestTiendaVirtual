import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Images, ImagesDocument } from '../images/schema/images.schema';
import { Product, ProductDocument } from './schema/product.schema';



@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Images.name) private imagesModel: Model<ImagesDocument>,
  ) { }

  async findAllJoinImages(): Promise<ProductDocument[]> {
    
    // Realizar join entre 'products' e 'images' utilizando aggregate

    try {
      const productsWithImages = await this.productModel.aggregate([
        {
          $lookup: {
            from: 'images',
            localField: 'code',
            foreignField: 'codigo',
            as: 'images',
          },
        },
      ]).exec();

      return productsWithImages;

    } catch (error) {
      throw new Error('Error al obtener la lista de productos con imagenes');
    }

  }

  async findAll(): Promise<Product[]> {
    try {
      const productList = await this.productModel.find().exec();
      return productList;

    } catch (error) {
      throw new Error('Error al obtener la lista de productos.');
    }
  }

  // Permisos de Trabajador o Administrador


  async create(createProductDto: CreateProductDto) {
    try {
      const createdProduct = new this.productModel(createProductDto);
      const savedProduct = await createdProduct.save();

      return savedProduct;

    } catch (error) {
      throw new Error('Error al crear el producto.');
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.productModel.findById(id).exec();
      return product;

    } catch (error) {
      throw new Error('Error al obtener el producto por ID.');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .exec();

      return updatedProduct;

    } catch (error) {
      throw new Error('Error al actualizar el producto.');
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
      return deletedProduct;

    } catch (error) {
      throw new Error('Error al eliminar el producto.');
    }
  }
}
