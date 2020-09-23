import { IBaseEntity } from 'src/make/make-interfaces/base-entity.interface';
import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';
import { IColor } from '../color-interfaces/color-entity.interface';

@Entity()
@Unique(['name'])
export class Color implements IColor, IBaseEntity {
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
