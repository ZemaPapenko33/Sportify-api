import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UserResponseDto } from './dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
