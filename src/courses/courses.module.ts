import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { User } from 'src/users/user.entity';
import { UserModule } from 'src/users/user.module';
import { CourseRepository } from './coursesRepository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User]), UserModule],
  providers: [CoursesService, CourseRepository],
  controllers: [CoursesController],
  exports: [CoursesService],
})
export class CoursesModule {}
