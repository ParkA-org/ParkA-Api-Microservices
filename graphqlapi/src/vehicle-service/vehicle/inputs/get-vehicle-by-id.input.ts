import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType('getVehicleByIdInput')
export class GetVehicleByIdInput implements IGetVehicleByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
