interface IUpdateNationalityDto {
  getNationalityByIdDto: IGetNationalityByIdDto;
  updateNationalityPayload: {
    name: string;
  };
}
