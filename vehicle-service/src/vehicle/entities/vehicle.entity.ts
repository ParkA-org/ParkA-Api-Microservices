import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';

@Entity()
export class Vehicle implements IVehicle, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  userInformation: string;

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
  bodyStyle: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  deleted: boolean;
}
