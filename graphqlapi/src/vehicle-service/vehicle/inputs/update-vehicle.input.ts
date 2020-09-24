import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdateVehicleInput } from '../interfaces/update-vehicle-input.interface';

@InputType('updateVehicleInput')
export class UpdateVehicleInput implements IUpdateVehicleInput {
  @IsUUID('4')
  @Field()
  id: string;

  @Field({ nullable: true })
  alias: string;

  @Field({ nullable: true })
  @IsUUID('4')
  colorExterior: string;

  @Field({ nullable: true })
  detail: string;

  @Field({ nullable: true })
  @MaxLength(7)
  @MinLength(7)
  licensePlate: string;

  @Field()
  mainPicture: string;

  @Field({ nullable: true })
  @IsUUID('4')
  model: string;
  pictures: string[];

  @Field({ nullable: true })
  @IsUUID('4')
  bodyStyle: string;

  @Field()
  verified: boolean;

  @Field({ nullable: true })
  @MaxLength(4)
  @MinLength(4)
  year: string;
}
