import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, Length, ValidateIf } from 'class-validator';

@InputType('CreateUserInformationInpuType')
export class CreateUserInformationInpuType
  implements ICreateUserInformationInputType {
  @Field()
  @IsUUID('4')
  paymentInformation: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: CreateUserInformationInpuType) =>
      input.documentNumber !== undefined,
  )
  @Length(11, 12)
  documentNumber: string;

  @Field(ype => [ID], { nullable: true, defaultValue: [] })
  @ValidateIf(
    (input: CreateUserInformationInpuType) => input.vehicles !== undefined,
  )
  @IsUUID('4', { each: true })
  vehicles: string[];

  @Field(type => [ID], { nullable: true, defaultValue: [] })
  @ValidateIf(
    (input: CreateUserInformationInpuType) => input.parkings !== undefined,
  )
  @IsUUID('4', { each: true })
  parkings: string[];

  @Field({ nullable: true })
  @ValidateIf(
    (input: CreateUserInformationInpuType) =>
      input.telephoneNumber !== undefined,
  )
  @Length(10, 11)
  telephoneNumber: string;

  @Field({ nullable: true })
  @ValidateIf(
    (input: CreateUserInformationInpuType) => input.birthDate !== undefined,
  )
  @IsDateString()
  birthDate: string;

  @Field({ nullable: true })
  placeOfBirth: string;

  @Field({ nullable: true })
  nationality: string;
}
