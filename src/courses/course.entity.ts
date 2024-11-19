import { courseGrade, language } from 'src/shared/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  grade: courseGrade;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  language: language;
}
