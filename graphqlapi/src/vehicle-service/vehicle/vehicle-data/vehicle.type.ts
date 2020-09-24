import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ColorType } from 'src/vehicle-service/colors/types/color.type';
import { VehicleModelType } from 'src/vehicle-service/vehicle-model/vehicle-model-data/vehicle-model.type';
import { VehicleTypeType } from 'src/vehicle-service/vehicle-type/vehicle-type-data/vehicle-type.type';

@ObjectType('Vehicle')
export class VehicleType {
  @Field(type => ID)
  id: string;

  @Field(type => VehicleModelType)
  model: string;

  @Field()
  licensePlate: string;

  @Field()
  verified: boolean;

  @Field()
  detail: string;

  @Field(type => ColorType)
  colorExterior: string;

  @Field()
  mainPicture: string;

  @Field(type => [String])
  pictures: string[];

  @Field()
  year: number;

  @Field()
  alias: string;

  @Field(type => VehicleTypeType)
  vehicleType: string;
}
