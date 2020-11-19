import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength, ValidateIf } from 'class-validator';

@InputType('UpdateVehiclePayload')
export class UpdateVehiclePayload implements IUpdateVehiclePayload {
  @Field({ nullable: true })
  @MaxLength(100)
  alias: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateVehiclePayload) => input.colorExterior !== undefined,
  )
  @IsUUID('4')
  colorExterior: string;

  @Field({ nullable: true })
  detail: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehiclePayload) => input.licensePlate !== undefined)
  @MaxLength(7)
  @MinLength(7)
  licensePlate: string;

  @Field({ nullable: true })
  mainPicture: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehiclePayload) => input.model !== undefined)
  @IsUUID('4')
  model: string;

  @Field({ nullable: true })
  pictures: string[];

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehiclePayload) => input.bodyStyle !== undefined)
  @IsUUID('4')
  bodyStyle: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateVehiclePayload) => input.year !== undefined)
  @MaxLength(4)
  @MinLength(4)
  year: string;
}
