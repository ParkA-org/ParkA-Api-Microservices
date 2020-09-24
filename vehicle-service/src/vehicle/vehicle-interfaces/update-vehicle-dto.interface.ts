export interface IUpdateVehicleDto {
  id: string;
  model: string;
  licensePlate: string;
  verified: boolean;
  detail: string;
  colorExterior: string;
  mainPicture: string;
  pictures: string[];
  year: string;
  alias: string;
  bodyStyle: string;
}
