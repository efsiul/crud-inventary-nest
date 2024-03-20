import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { EntityDTO } from '@mikro-orm/core';
import { CreateUserDto } from '@/api/user/dto/create-user.dto';
import { UserService } from '@/api/user/user.service';
import { User } from '@/domain/user';
import { EditUserDto } from './dto/edit_user.dto';

@Controller({ path: 'users', version: '1' })
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(
    @Body()
    userToCreateDto: CreateUserDto,
  ): Promise<EntityDTO<User>> {
    const { name } = userToCreateDto;
    return this.userService.createUser(name);
  }

  @Put(':id')
  public async editUser(
    @Param('id') id: string,
    @Body() userToEditDto: EditUserDto,
  ): Promise<EntityDTO<User>> {
    const { name } = userToEditDto;
    return this.userService.editUser(id, name);
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<EntityDTO<User>> {
    return this.userService.getUserById(id);
  }

  @Get()
  public async getAllUsers(): Promise<EntityDTO<User>[]> {
    return this.userService.getAllUsers();
  }
  
}


