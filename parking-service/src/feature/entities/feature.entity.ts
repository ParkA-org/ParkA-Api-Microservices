import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Feature implements IFeature, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  updatedAt: string;

  @Column()
  createdAt: string;

  @Column()
  slug: string;

  @Column()
  name: string;
}
