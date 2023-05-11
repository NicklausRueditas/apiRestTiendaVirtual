import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Images, ImagesSchema } from './schema/images.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Images.name,
        schema: ImagesSchema
      }
    ])
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
