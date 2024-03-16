import { EntityDTO, EntityManager, wrap } from '@mikro-orm/core';
import { BadRequestException, Injectable } from '@nestjs/common';
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
}
