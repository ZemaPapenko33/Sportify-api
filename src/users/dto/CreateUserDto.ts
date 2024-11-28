import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

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
