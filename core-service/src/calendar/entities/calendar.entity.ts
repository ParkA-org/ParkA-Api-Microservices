import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class ParkingCalendar implements ICalendar, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

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
}
