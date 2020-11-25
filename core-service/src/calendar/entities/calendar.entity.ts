import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Calendar implements ICalendar, IBaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  parking: string;

  @Column()
  schedules: Schedule[];

  @Column()
  date: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  deleted: boolean;
}
