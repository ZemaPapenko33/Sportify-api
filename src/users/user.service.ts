import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './userRepository.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  //Создать пользователя
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при создании пользователя',
      );
    }
  }

  // Получить всех пользователей
  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении списка пользователей',
      );
    }
  }

  // Найти пользователя по ID
  async findUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`Пользователь с ID ${id} не найден`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении пользователя',
      );
    }
  }

  // Обновить пользователя
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.userRepository.update(id, updateUserDto);
      return await this.findUserById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при обновлении пользователя',
      );
    }
  }

  // Удалить пользователя
  async deleteUser(id: number): Promise<void> {
    try {
      const result = await this.userRepository.softDelete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Пользователь с ID ${id} не найден`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при удалении пользователя',
      );
    }
  }
}
