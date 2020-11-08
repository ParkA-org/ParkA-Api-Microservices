import { IBaseEntity } from '../interfaces/base-entity.interface';
import { IReview } from '../interfaces/review-entity.interface';
import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity()
export class Review implements IReview, IBaseEntity {
  @PrimaryColumn()
  id: string;

  @ObjectIdColumn()
  _id: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  title: string;

  @Column()
  calification: number;

  @Column()
  parking: string;

  @Column()
  user: string;

  @Column()
  reservation: string;

  @Column()
  review: string;

  @Column()
  type: boolean;
}
