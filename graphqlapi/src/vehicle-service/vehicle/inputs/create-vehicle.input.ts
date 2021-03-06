import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';
@InputType('CreateVehicleInput')
export class CreateVehicleInput implements ICreateVehicleInput {
  @Field(type => ID)
  @IsUUID('4')
  model: string;

  @Field()
  @MaxLength(7)
  @MinLength(7)
  licensePlate: string;

  @Field({ defaultValue: '' })
  detail: string;

  @Field()
  @IsUUID('4')
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
  @IsUUID('4')
  bodyStyle: string;
}
