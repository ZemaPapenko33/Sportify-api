import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //Создать пользователя
  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const newUser = this.userRepository.create({ name, email, password });
    return this.userRepository.save(newUser);
  }

  // Получить всех пользователей
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Найти пользователя по ID
  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  // Обновить пользователя
  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.findUserById(id);
  }

  // Удалить пользователя
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
