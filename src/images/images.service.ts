import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Images, ImagesDocument } from './schema/images.schema';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {

  constructor(@InjectModel(Images.name) private imagesModel: Model<ImagesDocument>) { }

  async uploadImage(file: Express.Multer.File, createImageDto: CreateImageDto): Promise<Images> {
    const {filename, mimetype,size} = file;
    const image = new this.imagesModel({
      ...createImageDto,
      filename,
      mimetype,
      size
    });
    return await image.save();
  }

  async findAll() {
    const imagesList = await this.imagesModel.find({})
    return imagesList;
  }

  async getImageByFilename(filename: string): Promise<Images> {
    return this.imagesModel.findOne({ filename }).exec();
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
