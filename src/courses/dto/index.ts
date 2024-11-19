import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { CourseGradesEnum, LanguagesEnum } from 'src/shared/enums';

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
  @IsEnum(CourseGradesEnum)
  grade: CourseGradesEnum;

  @ApiProperty({ description: 'Course start date', example: '19.11.2024' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: 'Course end date', example: '19.11.2025' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date;

  @ApiProperty({ description: 'Language', example: 'ru' })
  @IsEnum(LanguagesEnum)
  language: LanguagesEnum;

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
  @IsEnum(CourseGradesEnum)
  @IsOptional()
  grade?: CourseGradesEnum;

  @ApiProperty({
    description: 'Course start date',
    example: '19.11.2024',
    required: false,
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Course end date',
    example: '19.11.2025',
    required: false,
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Language', example: 'ru', required: false })
  @IsEnum(LanguagesEnum)
  @IsOptional()
  language?: LanguagesEnum;
}

export class CourseResponseDto {
  @ApiProperty({ description: 'Course id', example: 'hutu83-nudnik888' })
  id: string;

  @ApiProperty({ description: 'Course title', example: 'Nest js for beginner' })
  title: string;

  @ApiProperty({
    description: 'Course description',
    example: 'This course for beginner',
  })
  description: string;

  @ApiProperty({ description: 'Course grade', example: 'Junior+' })
  grade: CourseGradesEnum;

  @ApiProperty({ description: 'Course start date', example: '19.11.2024' })
  startDate: Date;

  @ApiProperty({ description: 'Course end date', example: '19.11.2025' })
  endDate: Date;

  @ApiProperty({ description: 'Course language', example: 'ru' })
  language: LanguagesEnum;
}
