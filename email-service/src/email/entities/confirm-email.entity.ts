import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';
import { IConfirmEmail } from '../interfaces/confirm-email-entity.interface';

@Entity()
@Unique(['email'])
export class ConfirmEmail implements IConfirmEmail, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  origin: string;

  @Column()
  code: string;

  @Column()
  salt: string;

  @Column()
  completed: boolean;

  @Column()
  updatedAt: string;

  @Column()
  createdAt: string;
}