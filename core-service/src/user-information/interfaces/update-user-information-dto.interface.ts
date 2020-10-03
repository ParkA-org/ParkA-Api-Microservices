interface IUpdateUserInformationDto {
  getUserInformationByIdDto: IGetUserInformationByIdDto;
  updateUserInformationPayloadDto: {
    paymentInformation: string;
    documentNumber: string;
    vehicles: string[];
    parkings: string[];
    telephoneNumber: string;
    birthDate: string;
    placeOfBirth: string;
    nationality: string;
  };
}
