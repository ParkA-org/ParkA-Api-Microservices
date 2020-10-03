import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, Length, ValidateIf } from 'class-validator';

@InputType('updateUserInformationInput')
export class UpdateUserInformationInput implements IUpdateUserInformationInput {
  @Field()
  paymentInformation: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.documentNumber !== undefined,
  )
  @Length(11, 12)
  documentNumber: string;

  @Field(type => [ID], { nullable: true, defaultValue: [] })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.vehicles !== undefined,
  )
  @IsUUID('4', { each: true })
  vehicles: string[];

  @Field(type => [ID], { nullable: true, defaultValue: [] })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.parkings !== undefined,
  )
  @IsUUID('4', { each: true })
  parkings: string[];

  @Field()
  telephoneNumber: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.birthDate !== undefined,
  )
  @IsDateString()
  birthDate: string;

  @Field({ nullable: true })
  placeOfBirth: string;

  @Field({ nullable: true })
  nationality: string;
}
