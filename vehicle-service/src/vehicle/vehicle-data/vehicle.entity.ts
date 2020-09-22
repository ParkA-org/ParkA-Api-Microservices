import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IVehicle } from '../vehicle-interfaces/vehicle-entity.interface';

@Entity()
export class Vehicle implements IVehicle {
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
  year: string;

  @Column()
  alias: string;

  @Column()
  vehicleType: string;
}
