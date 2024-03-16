import { MongoDriver } from '@mikro-orm/mongodb';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from '@/domain/user';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const clientUrl = configService.get<string>('MONGO_URL');
        const dbName = configService.get<string>('MONGO_INITDB_DATABASE');
        return {
          driver: MongoDriver,
          implicitTransactions: true,
          autoLoadEntities: true,
          clientUrl,
          dbName,
          debug: true,
        };
      },
      inject: [ConfigService],
    }),
    MikroOrmModule.forFeature([User]),
  ],
})
export class RepositoryModule {}
