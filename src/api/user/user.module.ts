import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserController } from '@/api/user/user.controller';
import { UserService } from '@/api/user/user.service';
import { User } from '@/domain/user';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
