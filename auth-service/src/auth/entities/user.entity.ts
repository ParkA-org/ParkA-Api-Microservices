import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User implements IUser, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  profilePicture?: string;

  @Column()
  updatedAt: string;

  @Column()
  createdAt: string;

  @Column()
  userInformation?: string;

  @Column()
  credential: string;

  @Column()
  password: string;

  @Column()
  confirmed: boolean;

  @Column()
  origin: string;
}
