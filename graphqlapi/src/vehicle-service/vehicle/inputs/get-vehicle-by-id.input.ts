import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType('getVehicleByIdInput')
export class GetVehicleByIdInput implements IGetVehicleByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
