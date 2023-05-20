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
  ) {}

  async getProductsWithImages(): Promise<ProductsDocument[]> {
    // Realizar join entre 'products' e 'images' utilizando aggregate
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
  }

  async create(createProductDto: CreateProductDto) {
    const productCreated = await this.productsModel.create(createProductDto);
    return productCreated;
  }

  async findAll() {
    const productList = await this.productsModel.find({});
    return productList;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
