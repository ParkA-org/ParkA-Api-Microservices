import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Vehicle {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  model: string;

  @Column()
  licensePlate: string;

  @Column()
  verified: boolean;

  @Column()
  detail: string;

  @Column()
  colorExterior: string;

  @Column()
  mainPicture: string;

  @Column()
  pictures: string[];

  @Column()
  year: number;

  @Column()
  alias: string;

  @Column()
  vehicleType: string;
}
