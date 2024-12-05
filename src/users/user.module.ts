import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Course } from 'src/courses/course.entity';
import { UserRepository } from './userRepository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
