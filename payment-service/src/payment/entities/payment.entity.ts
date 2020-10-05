import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';
import { IPayment } from '../interfaces/payment-entity.interface';

@Entity()
export class Payment implements IPayment, IBaseEntity {
  @PrimaryColumn()
  id: string;

  @ObjectIdColumn()
  _id: string;

  @Column()
  cardHolder: string;

  @Column()
  digit: string;

  @Column()
  expirationDate: string;

  @Column()
  salt: string;

  @Column()
  cvv: string;

  @Column()
  activated: boolean;

  @Column()
  deleted: boolean;

  @Column()
  card: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
