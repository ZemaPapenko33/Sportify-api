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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller(UserRoutes.ROOT)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'User was created' })
  @ApiResponse({ status: 400, description: 'Error when creating a user' })
  async createUser(
    @Body() createUserDTO: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(createUserDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users in DB' })
  @ApiResponse({ status: 200, description: 'All users' })
  @ApiResponse({
    status: 400,
    description: 'Error when retrieving the list of users',
  })
  async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.findAllUsers();
  }

  @Get(UserRoutes.BY_ID)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'User was searched' })
  @ApiResponse({ status: 400, description: 'Error when searched a user' })
  async findUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findUserById(id);
  }

  @Put(UserRoutes.BY_ID)
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'User was updated' })
  @ApiResponse({ status: 400, description: 'Error when updated a user' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(UserRoutes.BY_ID)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User was deleted' })
  @ApiResponse({ status: 400, description: 'Error when deleted a user' })
  async deleteUser(@Param('id') id: string): Promise<string> {
    return await this.userService.deleteUser(id);
  }
}
