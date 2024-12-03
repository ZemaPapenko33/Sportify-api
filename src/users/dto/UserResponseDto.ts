import { ApiProperty } from '@nestjs/swagger';

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
}
