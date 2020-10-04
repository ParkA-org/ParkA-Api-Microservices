import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';
import { ICard } from '../interfaces/card-entity.interface';

@Entity()
@Unique(['name'])
export class Card implements IBaseEntity, ICard {
  @PrimaryColumn()
  id: string;

  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
