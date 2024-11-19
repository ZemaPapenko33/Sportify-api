import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { UserRepository } from './userRepository.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  //Создать пользователя
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Error when creating a user');
    }
  }

  // Получить всех пользователей
  async findAllUsers(): Promise<UserResponseDto[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when retrieving the list of users',
      );
    }
  }

  // Найти пользователя по ID
  async findUserById(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error when retrieving a user');
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
      throw new InternalServerErrorException('Error during user update');
    }
  }

  // Удалить пользователя
  async deleteUser(id: string): Promise<string> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User ID ${id} not found`);
      }
      return `User with ID ${id} has been deleted successfully`;
    } catch (error) {
      throw new InternalServerErrorException('Error when deleting a user');
    }
  }
}
