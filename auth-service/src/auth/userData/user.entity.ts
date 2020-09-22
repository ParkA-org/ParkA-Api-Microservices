import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
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
  updateAt: Date;

  @Column()
  createAt: Date;

  @Column()
  accountData?: string;

  @Column()
  credentialId: string;

  @Column()
  password: string;

  //TODO: add credential id

  //TODO: information id
}
