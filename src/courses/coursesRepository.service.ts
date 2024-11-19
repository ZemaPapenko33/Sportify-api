import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseRepository extends Repository<Course> {
  constructor(@InjectRepository(Course) repository: Repository<Course>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
