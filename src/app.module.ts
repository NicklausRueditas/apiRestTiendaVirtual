import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { ConfigModule } from '@nestjs/config';
import config from './config';
// import { environments } from './environments';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    ImagesModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}