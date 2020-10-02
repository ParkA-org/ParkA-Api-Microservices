import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class UserInformation implements IUserInformation, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  paymentInformation: string;

  @Column()
  documentNumber: string;

  @Column()
  vehicles: string[];

  @Column()
  parkings: string[];

  @Column()
  telephoneNumber: string;

  @Column()
  birthDate: string;

  @Column()
  placeOfBirth: string;

  @Column()
  nationality: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
