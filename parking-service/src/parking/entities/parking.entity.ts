import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IParking } from '../interfaces/parking-entity.interface';

@Entity()
export class Parking implements IParking, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  updatedAt: string;

  @Column()
  createdAt: string;

  @Column()
  countParking: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  published: boolean;

  @Column()
  parkingName: string;

  @Column()
  calendar: string;

  @Column()
  priceHours: number;

  @Column()
  pictures: string[];

  @Column()
  mainPicture: string;

  @Column()
  isAvailable: boolean;

  @Column()
  sector: string;

  @Column()
  direction: string;

  @Column()
  information: string;

  @Column()
  features: string[];

  @Column()
  verified: boolean;

  @Column({ type: 'point' })
  position: {
    coordinates: number[];
    type: 'Point';
  };

  @Column()
  userInformation: string;

  @Column()
  rating: number;

  @Column()
  totalReviews: number;

  @Column()
  deleted: boolean;
}
