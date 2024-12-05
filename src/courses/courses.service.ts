import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './coursesRepository.service';
import { CourseResponseDto, CreateCourseDto, UpdateCourseDto } from './dto';
import { UserService } from 'src/users/user.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: CourseRepository,
    private readonly userService: UserService,
  ) {}

  //create course
  async createCourse(
    createCourseDto: CreateCourseDto,
  ): Promise<CourseResponseDto> {
    try {
      const { ownerId } = createCourseDto;
      const owner = await this.userService.findUserById(ownerId);
      const newCourse = this.courseRepository.create({
        owner,
        title: createCourseDto.title,
        description: createCourseDto.description,
        grade: createCourseDto.grade,
        startDate: createCourseDto.startDate,
        endDate: createCourseDto.endDate,
        language: createCourseDto.language,
      });

      return await this.courseRepository.save(newCourse);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error when creating a course:${error.message}`,
      );
    }
  }

  //get all course
  async findAllCourses(): Promise<CourseResponseDto[]> {
    try {
      return await this.courseRepository.find({ relations: ['owner'] });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error when retrieving the list of courses:${error.message}`,
      );
    }
  }

  //get course by id
  async findCourseById(id: string): Promise<CourseResponseDto> {
    try {
      const course = await this.courseRepository.findOneByOrFail({ id });
      return course;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error when retrieving a course:${error.message}`,
      );
    }
  }

  //update a course
  async updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    try {
      await this.courseRepository.update(id, updateCourseDto);
      return await this.findCourseById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error during course update:${error.message}`,
      );
    }
  }

  //delete a course
  async deleteCourse(id: string): Promise<string> {
    try {
      const result = await this.courseRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Course ID ${id} not found`);
      }
      return `Course with ID${id} has been deleted successfully`;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error when deleting a course: ${error.message}`,
      );
    }
  }

  //Add course to user
  async addCourseToUser(
    courseId: string,
    userId: string,
  ): Promise<CourseResponseDto> {
    try {
      const user = await this.userService.findUserById(userId);
      const course = await this.courseRepository.findOneOrFail({
        where: { id: courseId },
      });

      course.users.push(user);
      return await this.courseRepository.save(course);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error when added course to user:${error.message}`,
      );
    }
  }
}
