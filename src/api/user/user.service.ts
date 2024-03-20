import { EntityDTO, EntityManager, wrap } from '@mikro-orm/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/infrastructure/repository/user.repository';
import { User } from '@/domain/user';

@Injectable()
export class UserService {
  public constructor(
    private readonly entityManager: EntityManager,
    private readonly userRepository: UserRepository,
  ) {}

  public async createUser(name: string): Promise<EntityDTO<User>> {
    const user = await this.userRepository.findOne({ name });
    if (user !== null) {
      throw new BadRequestException(`El nombre "${name}" ya está en uso`);
    }
    const createdUser = this.userRepository.create({ name });
    await this.entityManager.persistAndFlush(createdUser);
    return wrap(createdUser).toObject();
  }
  public async editUser(id: string, name: string): Promise<EntityDTO<User>> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    user.name = name;
    await this.entityManager.flush();
    return wrap(user).toObject();
  }

  public async getUserById(id: string): Promise<EntityDTO<User>> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return wrap(user).toObject();
  }

  public async getAllUsers(): Promise<EntityDTO<User>[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => wrap(user).toObject());
  }

  async deleteUser(id: string): Promise<number> {
    return this.userRepository.nativeDelete({ id });
  }


}
