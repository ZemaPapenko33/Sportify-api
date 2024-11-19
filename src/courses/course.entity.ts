import { CourseGradesEnum, LanguagesEnum } from 'src/shared/enums';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  language: LanguagesEnum;

  @ManyToMany(() => User, (user) => user.courses)
  @JoinTable()
  users: User[];
}
