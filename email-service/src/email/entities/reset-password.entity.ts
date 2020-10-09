import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

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
