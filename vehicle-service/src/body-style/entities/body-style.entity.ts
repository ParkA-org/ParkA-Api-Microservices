import { IBaseEntity } from 'src/make/interfaces/base-entity.interface';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IBodyStyle } from '../interfaces/body-style-entity.interface';

@Entity()
export class BodyStyle implements IBodyStyle, IBaseEntity {
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
