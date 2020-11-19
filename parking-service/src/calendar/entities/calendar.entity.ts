import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { Schedule } from './schedule.entity';

@Entity()
export class Calendar implements ICalendar, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: string;

  @Column()
  parkingId: string;

  @Column()
  monday: Schedule[];

  @Column()
  tuesday: Schedule[];

  @Column()
  wednesday: Schedule[];

  @Column()
  thursday: Schedule[];

  @Column()
  friday: Schedule[];

  @Column()
  saturday: Schedule[];

  @Column()
  sunday: Schedule[];

  @Column()
  updatedAt: string;

  @Column()
  createdAt: string;
}
