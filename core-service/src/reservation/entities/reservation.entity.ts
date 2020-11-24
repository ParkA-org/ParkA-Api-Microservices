import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IReservation } from '../interfaces/reservation-entity.interface';
import { ReservationStatuses } from './../utils/statuses';

@Entity()
export class Reservation implements IReservation, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  parking: string;

  @Column()
  client: string;

  @Column()
  owner: string;

  @Column()
  reviewed: boolean;

  @Column()
  checkInDate: string;

  @Column()
  checkOutDate: string;

  @Column()
  vehicle: string;

  @Column()
  paymentInfo: string;

  @Column()
  total: number;

  @Column()
  rentDate: string;

  @Column()
  status: ReservationStatuses;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
