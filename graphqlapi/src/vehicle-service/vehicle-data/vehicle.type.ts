import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Vehicle')
export class VehicleType {
  @Field(type => ID)
  id: string;

  @Field()
  modelId: string;

  @Field()
  licensePlate: string;

  @Field()
  verified: boolean;

  @Field()
  detail: string;

  @Field(type => ID)
  colorExteriorId: string;

  @Field()
  mainPicture: string;

  @Field(type => [String])
  pictures: string[];

  @Field()
  year: number;

  @Field()
  alias: string;

  @Field(type => ID)
  vehicleTypeId: string;
}
