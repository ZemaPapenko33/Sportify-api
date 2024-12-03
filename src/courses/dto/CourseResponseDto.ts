import { ApiProperty } from '@nestjs/swagger';
import { CourseGradesEnum, LanguagesEnum } from 'src/shared/enums';

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
