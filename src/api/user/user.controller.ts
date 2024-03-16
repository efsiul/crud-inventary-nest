import { Controller, Post, Body } from '@nestjs/common';
import { EntityDTO } from '@mikro-orm/core';
import { CreateUserDto } from '@/api/user/dto/create-user.dto';
import { UserService } from '@/api/user/user.service';
import { User } from '@/domain/user';

@Controller({ path: 'users', version: '1' })
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(
    @Body() userToCreateDto: CreateUserDto,
  ): Promise<EntityDTO<User>> {
    const { name } = userToCreateDto;
    return this.userService.createUser(name);
  }
}
