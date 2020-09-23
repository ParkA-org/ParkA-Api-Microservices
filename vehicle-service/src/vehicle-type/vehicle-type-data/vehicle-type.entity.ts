import { IBaseEntity } from 'src/make/make-interfaces/base-entity.interface';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IVehicleType } from '../vehicle-type-interfaces/vehicle-type-entity.interface';

@Entity()
export class VehicleType implements IVehicleType, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
