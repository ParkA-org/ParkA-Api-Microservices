import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';
import { IResetPassword } from '../interfaces/reset-password-entity.interface';

@Entity()
@Unique(['email'])
export class ResetPassword implements IResetPassword, IBaseEntity {
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
