import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Images, ImagesDocument } from './schema/images.schema';
import { Model } from 'mongoose';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImagesService {

  constructor(@InjectModel(Images.name) private imagesModel: Model<ImagesDocument>) { }

  async uploadImage(file: Express.Multer.File, createImageDto: CreateImageDto): Promise<Images> {
    const {filename,mimetype,size} = file;
    const idLink = filename
    const image = new this.imagesModel({
      ...createImageDto,
      idLink,
      mimetype,
      size
    });
    return await image.save();
  }

  async findAll() {
    const imagesList = await this.imagesModel.find({})
    return imagesList;
  }

  async getImageByFilename(idLink: string): Promise<Images> {
    return this.imagesModel.findOne({ idLink }).exec();
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(idLink: string): Promise<{ deleted: boolean; message?: string }> {
    // Paso 1: Eliminar el documento de la base de datos
    const result = await this.imagesModel.deleteOne({ idLink }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Image with idLink ${idLink} not found.`);
    }

    // Paso 2: Eliminar el archivo del sistema de archivos
    const filePath = path.join(__dirname, '../../uploads', idLink); // Ajusta la ruta según tu estructura
    try {
      fs.unlinkSync(filePath); // Elimina el archivo de forma sincrónica
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error.message);
      return { deleted: true, message: `Document deleted but failed to delete file: ${error.message}` };
    }

    // Retorna un mensaje de éxito
    return { deleted: true, message: `Image with idLink ${idLink} successfully deleted.` };
  }
}
