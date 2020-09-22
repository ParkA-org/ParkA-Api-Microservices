import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IVehicleType } from '../vehicle-type-interfaces/vehicle-entity.interface';

@Entity()
export class VehicleType implements IVehicleType {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
