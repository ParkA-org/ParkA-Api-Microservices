import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Make implements IMake, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  models: string[];

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
