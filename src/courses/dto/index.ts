import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { courseGrade, language } from 'src/shared/enums';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Course title',
    example: 'Nest js course for beginner',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Course describe',
    example: 'This course is for those who want to learn Nest.',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Course grade', example: 'Easy' })
  @IsEnum(courseGrade)
  grade: courseGrade;

  @ApiProperty({ description: 'Course start date', example: '19.11.2024' })
  @Transform(({ value }) => new Date(value)) // Преобразуем строку в Date
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: 'Course end date', example: '19.11.2025' })
  @Transform(({ value }) => new Date(value)) // Преобразуем строку в Date
  @IsDate()
  endDate: Date;

  @ApiProperty({ description: 'Language', example: 'ru' })
  @IsEnum(language)
  language: language;

  //В дальнейшем можно добавить (преподавателей, стек, Этапы курса (1,2,3, и тд), )
}

export class UpdateCourseDto {
  @ApiProperty({
    description: 'Course title',
    example: 'Nest js course for beginner',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Course describe',
    example: 'This course is for those who want to learn Nest.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Course grade',
    example: 'Easy',
    required: false,
  })
  @IsEnum(courseGrade)
  @IsOptional()
  grade?: courseGrade;

  @ApiProperty({
    description: 'Course start date',
    example: '19.11.2024',
    required: false,
  })
  @IsDate()
  @Transform(({ value }) => new Date(value)) // Преобразуем строку в Date
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Course end date',
    example: '19.11.2025',
    required: false,
  })
  @IsDate()
  @Transform(({ value }) => new Date(value)) // Преобразуем строку в Date
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Language', example: 'ru', required: false })
  @IsEnum(language)
  @IsOptional()
  language?: language;
}

export class CourseResponseDto {
  id: string;
  title: string;
  description: string;
  grade: courseGrade;
  startDate: Date;
  endDate: Date;
  language: language;
}
