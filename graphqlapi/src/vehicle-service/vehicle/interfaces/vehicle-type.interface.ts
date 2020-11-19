interface IVehicleType {
  id: string;

  model: string;

  licensePlate: string;
  verified: boolean;

  detail: string;

  colorExterior: string;

  mainPicture: string;

  pictures: string[];

  year: number;

  alias: string;

  bodyStyle: string;
}
