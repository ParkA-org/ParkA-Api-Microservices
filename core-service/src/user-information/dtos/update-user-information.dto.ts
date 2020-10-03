export class UpdateUserInformationDto implements IUpdateUserInformationDto {
  paymentInformation: string;
  documentNumber: string;
  vehicles: string[];
  parkings: string[];
  telephoneNumber: string;
  birthDate: string;
  placeOfBirth: string;
  nationality: string;
}
