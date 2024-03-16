import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from '@/infrastructure/repository/repository.module';
import { UserModule } from '@/api/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), RepositoryModule, UserModule],
})
export class AppModule {}
