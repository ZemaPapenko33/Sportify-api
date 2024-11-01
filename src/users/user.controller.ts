import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { UserRoutes } from './routers/user.routers';

@Controller(UserRoutes.ROOT)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDTO: CreateUserDto,
  ): Promise<UserResponseDto> {
    try {
      return await this.userService.createUser(createUserDTO);
    } catch (error) {
      throw new NotFoundException('Ошибка при создании пользователя');
    }
  }

  @Get()
  async findAllUsers(): Promise<UserResponseDto[]> {
    try {
      return await this.userService.findAllUsers();
    } catch (error) {
      throw new NotFoundException('Ошибка при получении списка пользователей');
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<UserResponseDto> {
    try {
      return await this.userService.findUserById(id);
    } catch (error) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException(
        `Ошибка при обновлении пользователя с ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      throw new NotFoundException(
        `Ошибка при удалении пользователя с ID ${id}`,
      );
    }
  }
}
