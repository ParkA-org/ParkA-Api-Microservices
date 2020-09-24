import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ColorType } from 'src/vehicle-service/color/types/color.type';
import { ModelType } from 'src/vehicle-service/model/types/model.type';
import { BodyStyleType } from 'src/vehicle-service/body-style/types/body-style.type';

@ObjectType('Vehicle')
export class VehicleType {
  @Field(type => ID)
  id: string;

  @Field(type => ModelType)
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

  @Field(type => BodyStyleType)
  vehicleType: string;
}
