import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Products, ProductsDocument } from './schema/products.schema';
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Products.name) private productsModel: Model<ProductsDocument>) { }

  async create(createProductDto: CreateProductDto) {
    const productCreated = await this.productsModel.create(createProductDto)
    return productCreated
  }

  async findAll() {
    const productList = await this.productsModel.find({})
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
