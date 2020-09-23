import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IBaseEntity } from '../vehicle-interfaces/base-entity.interface';
import { IModel } from '../vehicle-interfaces/model-entity.interface';

@Entity()
export class Model implements IModel, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  make: string;

  @Column()
  name: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
