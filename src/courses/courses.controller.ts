import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseRoutes } from './routes/course.routes';
import { CoursesService } from './courses.service';
import { CourseResponseDto, CreateCourseDto, UpdateCourseDto } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRoutes } from 'src/users/routers/user.routers';

@Controller(CourseRoutes.ROOT)
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create course' })
  @ApiResponse({ status: 200, description: 'Course was created' })
  @ApiResponse({ status: 400, description: 'Error when creating a course' })
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseResponseDto> {
    return await this.courseService.createCourse(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Get all courses' })
  @ApiResponse({
    status: 400,
    description: 'Error when retrieving the list of courses',
  })
  async findAllCourses(): Promise<CourseResponseDto[]> {
    return await this.courseService.findAllCourses();
  }

  @Get(UserRoutes.BY_ID)
  @ApiOperation({ summary: 'Get course by id' })
  @ApiResponse({ status: 200, description: 'Get course by id' })
  @ApiResponse({ status: 400, description: 'Error when searched a course' })
  async findCourseById(@Param('id') id: string): Promise<CourseResponseDto> {
    return await this.courseService.findCourseById(id);
  }

  @Put(UserRoutes.BY_ID)
  @ApiOperation({ summary: 'Update course' })
  @ApiResponse({ status: 200, description: 'Course was updated' })
  @ApiResponse({ status: 400, description: 'Error when updated a course' })
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    return await this.courseService.updateCourse(id, updateCourseDto);
  }

  @Delete(UserRoutes.BY_ID)
  @ApiOperation({ summary: 'Delete course' })
  @ApiResponse({ status: 200, description: 'Course was deleted' })
  @ApiResponse({ status: 400, description: 'Error when deleted a course' })
  async deleteCourse(@Param('id') id: string): Promise<string> {
    return await this.courseService.deleteCourse(id);
  }
}