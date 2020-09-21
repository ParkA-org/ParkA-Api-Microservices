import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryColumn()
  id: string;

  @Column()
  modelId: string;

  @Column()
  licensePlate: string;

  @Column()
  verified: boolean;

  @Column()
  detail: string;

  @Column()
  colorExteriorId: string;

  @Column()
  mainPicture: string;

  @Column()
  pictures: string[];

  @Column()
  year: number;

  @Column()
  alias: string;

  @Column()
  vehicleTypeId: string;
}
