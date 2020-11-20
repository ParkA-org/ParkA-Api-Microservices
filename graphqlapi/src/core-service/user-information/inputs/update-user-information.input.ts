import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, Length, ValidateIf } from 'class-validator';

@InputType('UpdateUserInformationInput')
export class UpdateUserInformationInput implements IUpdateUserInformationInput {
  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) =>
      input.paymentInformation !== undefined,
  )
  @IsUUID('4')
  paymentInformation: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.documentNumber !== undefined,
  )
  @Length(11, 12)
  documentNumber: string;

  @Field(type => [ID], { nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.vehicles !== undefined,
  )
  @IsUUID('4', { each: true })
  vehicles: string[];

  @Field(type => [ID], { nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.parkings !== undefined,
  )
  @IsUUID('4', { each: true })
  parkings: string[];

  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.telephoneNumber !== undefined,
  )
  @Length(10, 14)
  telephoneNumber: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.birthDate !== undefined,
  )
  @IsDateString()
  birthDate: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.placeOfBirth !== undefined,
  )
  @IsUUID('4')
  placeOfBirth: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: UpdateUserInformationInput) => input.nationality !== undefined,
  )
  @IsUUID('4')
  nationality: string;
}
