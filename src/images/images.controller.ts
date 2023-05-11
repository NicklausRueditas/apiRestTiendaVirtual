import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

import { FileInterceptor } from '@nestjs/platform-express';

import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post('upload')
  @UseInterceptors(
    
    FileInterceptor('file', {
      storage: diskStorage({
        destination:'./uploads',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          cb(null, `${filename}${extname(file.originalname)}`);
        }
      }),

      fileFilter: (req, file, cb) => {

        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )

  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() createImageDto: CreateImageDto) {
    return await this.imagesService.uploadImage(file, createImageDto);
  }


  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
