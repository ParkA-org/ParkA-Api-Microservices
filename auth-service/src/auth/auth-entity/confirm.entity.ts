import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class Credential {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  code: string;

  @Column()
  salt: string;

  @Column()
  email: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  //TODO: information id
}
