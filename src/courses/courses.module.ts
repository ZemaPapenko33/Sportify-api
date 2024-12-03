import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User])],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [CoursesService],
})
export class CoursesModule {}
