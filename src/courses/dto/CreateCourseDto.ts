import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';
import { CourseGradesEnum, LanguagesEnum } from 'src/shared/enums';

export class CreateCourseDto {
  @IsUUID()
  @ApiProperty({ description: 'Owner id', example: '92189h-djkkdj087373' })
  ownerId: string;

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
