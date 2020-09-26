import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { IUpdateVehicleInput } from '../interfaces/update-vehicle-input.interface';

@InputType('updateVehicleInput')
export class UpdateVehicleInput implements IUpdateVehicleInput {
  @Field()
  @IsUUID('4')
  id: string;

  @Field({ nullable: true })
  @MaxLength(100)
  alias: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehicleInput) => input.colorExterior !== undefined)
  @IsUUID('4')
  colorExterior: string;

  @Field({ nullable: true })
  detail: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehicleInput) => input.licensePlate !== undefined)
  @MaxLength(7)
  @MinLength(7)
  licensePlate: string;

  @Field({ nullable: true })
  mainPicture: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehicleInput) => input.model !== undefined)
  @IsUUID('4')
  model: string;

  pictures: string[];

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehicleInput) => input.bodyStyle !== undefined)
  @IsUUID('4')
  bodyStyle: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehicleInput) => input.year !== undefined)
  @MaxLength(4)
  @MinLength(4)
  year: string;
}
