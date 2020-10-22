import { Field, InputType } from '@nestjs/graphql';
import { GetVehicleByIdInput } from './get-vehicle-by-id.input';
import { UpdateVehiclePayload } from './update-vehicle.payload';

@InputType('UpdateVehicleInput')
export class UpdateVehicleInput implements IUpdateVehicleInput {
  @Field()
  getVehicleByIdPayload: GetVehicleByIdInput;
  @Field()
  updateVehiclePayload: UpdateVehiclePayload;
}
