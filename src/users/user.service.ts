import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { UserRepository } from './userRepository.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  //Создать пользователя
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
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
  async findAllUsers(): Promise<UserResponseDto[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении списка пользователей',
      );
    }
  }

  // Найти пользователя по ID
  async findUserById(id: string): Promise<UserResponseDto> {
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
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
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
  async deleteUser(id: string): Promise<void> {
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
