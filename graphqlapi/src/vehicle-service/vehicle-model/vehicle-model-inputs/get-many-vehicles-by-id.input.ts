import { IGetManyVehicleModelsByIdInput } from '../vehicle-model-interfaces/get-many-vehicle-models-by-id-input.interface';

export class GetManyVehiclesByIdInput
  implements IGetManyVehicleModelsByIdInput {
  ids: string[];
}
