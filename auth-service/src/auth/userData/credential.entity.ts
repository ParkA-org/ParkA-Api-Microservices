import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  email: string;

  //TODO: add credential id

  //TODO: information id
}
