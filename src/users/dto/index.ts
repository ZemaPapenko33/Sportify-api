import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Course } from 'src/courses/course.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email', example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: '12345678' })
  @IsString()
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password?: string;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'User id',
    example: 'ex12-am34-pl56',
  })
  id: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  email: string;

  @ApiProperty({
    description: 'Date created user',
    example: '2024-11-19 08:23:04.608',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date updated user',
    example: '2024-11-19 08:23:04.608',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Date deleted user',
    example: '2024-11-19 08:23:04.608',
  })
  deletedAt?: Date | null;
  courses?: Course[];
}
