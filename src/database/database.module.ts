import { Global, Module } from '@nestjs/common'; 
import {ConfigType} from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';

import config from 'src/config';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigType<typeof config>) => {
                return{
                    uri:configService.mongo.mongo_db_uri
                }
            },
            inject: [config.KEY],
        }),
    ],
    exports:[
        MongooseModule
    ]
})
export class DatabaseModule { }
