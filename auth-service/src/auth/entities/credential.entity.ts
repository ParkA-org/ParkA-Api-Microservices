import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';
import { ICredential } from '../interfaces/credential-entity.interface';

@Entity()
@Unique(['email'])
export class Credential implements ICredential, IBaseEntity {
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

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  //TODO: information id
}
