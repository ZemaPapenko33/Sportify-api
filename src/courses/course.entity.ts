import { CourseGradesEnum, LanguagesEnum } from 'src/shared/enums';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('courses')
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
  @JoinTable({
    name: 'courses_users',
    joinColumn: { name: 'course_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  @ManyToOne(() => User, (user) => user.ownedCourses)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
