import { IsUUID } from 'class-validator';
import { IUpdateVehicleMakeModelListInput } from '../vehicle-make-interfaces/update-make-model-list-input.interface';

export class UpdateVehicleMakeModelList
  implements IUpdateVehicleMakeModelListInput {
  @IsUUID('4')
  makeId: string;

  @IsUUID('4')
  modelId: string;
}
