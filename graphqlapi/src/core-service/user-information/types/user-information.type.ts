import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CountryType } from 'src/core-service/country/types/country.type';
import { NationalityType } from 'src/core-service/nationality/types/nationality.type';
import { ParkingType } from 'src/parking-service/parking/types/parking.type';
import { PaymentType } from 'src/payment-service/payment/types/payment.type';
import { VehicleType } from 'src/vehicle-service/vehicle/types/vehicle.type';

@ObjectType('UserInformation')
export class UserInformationType implements IUserInformationType {
  @Field()
  id: string;

  @Field(type => [PaymentType], { nullable: true })
  paymentInformation: string[];

  @Field({ nullable: true })
  documentNumber: string;

  @Field(type => [VehicleType], { nullable: true })
  vehicles: string[];

  @Field(type => [ParkingType], { nullable: true })
  parkings: string[];

  @Field({ nullable: true })
  telephoneNumber: string;

  @Field({ nullable: true })
  birthDate: string;

  @Field(type => CountryType)
  placeOfBirth: string;

  @Field(type => NationalityType)
  nationality: string;
}
