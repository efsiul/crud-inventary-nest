import { EntityRepository } from '@mikro-orm/mongodb';
import { User } from '@/domain/user';

export class UserRepository extends EntityRepository<User> {

    
}
