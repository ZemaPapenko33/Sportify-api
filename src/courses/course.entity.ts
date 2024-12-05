import { CourseGradesEnum, LanguagesEnum } from 'src/shared/enums';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  grade: CourseGradesEnum;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column()
  language: LanguagesEnum;

  @ManyToMany(() => User, (user) => user.courses)
  @JoinTable({ name: 'course_user' })
  users: User[];

  @ManyToOne(() => User, (user) => user.ownedCourses)
  owner: User;
}
