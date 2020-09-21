import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, Length, MaxLength, MinLength } from 'class-validator';

@InputType('createVehicleInput')
export class CreateVehicleInput {
  @Field(type => ID, { nullable: true, defaultValue: null })
  //   @IsUUID('all')
  model: string;

  @Field()
  //   @Length(11)
  licensePlate: string;

  @Field(type => Boolean, { defaultValue: false })
  verified: boolean;

  @Field({ defaultValue: '' })
  detail: string;

  @Field()
  colorExterior: string;

  @Field()
  mainPicture: string;

  @Field(type => [String])
  pictures: string[];

  @Field()
  @MinLength(4)
  @MaxLength(4)
  year: string;

  @Field({ defaultValue: '' })
  alias: string;

  @Field(type => ID)
  vehicleType: string;
}
