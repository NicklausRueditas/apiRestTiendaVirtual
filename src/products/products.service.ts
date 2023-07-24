import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Images, ImagesDocument } from '../images/schema/images.schema';

import { Products, ProductsDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
    @InjectModel(Images.name) private imagesModel: Model<ImagesDocument>,
  ) { }

  async findAllJoinImages(): Promise<ProductsDocument[]> {
    
    // Realizar join entre 'products' e 'images' utilizando aggregate

    try {
      const productsWithImages = await this.productsModel.aggregate([
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

  async findAll(): Promise<ProductsDocument[]> {
    try {
      const productList = await this.productsModel.find().exec();
      return productList;

    } catch (error) {
      throw new Error('Error al obtener la lista de productos.');
    }
  }

  // Permisos de Trabajador o Administrador


  async create(createProductDto: CreateProductDto) {
    try {
      const createdProduct = new this.productsModel(createProductDto);
      const savedProduct = await createdProduct.save();

      return savedProduct;

    } catch (error) {
      throw new Error('Error al crear el producto.');
    }
  }

  async findById(id: string): Promise<Products | null> {
    try {
      const product = await this.productsModel.findById(id).exec();
      return product;

    } catch (error) {
      throw new Error('Error al obtener el producto por ID.');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Products> {
    try {
      const updatedProduct = await this.productsModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .exec();

      return updatedProduct;

    } catch (error) {
      throw new Error('Error al actualizar el producto.');
    }
  }

  async remove(id: string): Promise<Products> {
    try {
      const deletedProduct = await this.productsModel.findByIdAndDelete(id).exec();
      return deletedProduct;

    } catch (error) {
      throw new Error('Error al eliminar el producto.');
    }
  }
}
