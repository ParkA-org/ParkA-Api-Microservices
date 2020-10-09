import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, ValidateIf } from 'class-validator';
import { IUpdateParkingInput } from '../interfaces/update-parking-input.interface';

@InputType()
export class UpdateParkingInput implements IUpdateParkingInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  countParking: number;

  @Field({ nullable: true })
  published: boolean;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateParkingInput) => input.parkingName !== undefined)
  @MinLength(2)
  @MaxLength(50)
  parkingName: string;

  @Field({ nullable: true })
  calendar: string;

  @Field({ nullable: true })
  priceHours: string;

  @Field({ nullable: true })
  pictures: string[];

  @Field({ nullable: true })
  mainPicture: string;

  @Field({ nullable: true })
  isAvailable: boolean;

  @Field({ nullable: true })
  information: string;

  @Field({ nullable: true })
  features: string[];
}
