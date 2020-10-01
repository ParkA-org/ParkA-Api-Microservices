import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Reservation implements IReservation {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  checkInDate: string;

  @Column()
  checkOutDate: string;

  @Column()
  vehicleId: string;

  @Column()
  paymentInfoId: string;

  @Column()
  rentDate: string;

  @Column()
  status: string;

  @Column()
  userId: string;
}
