import { Module } from '@nestjs/common';
import { ColorModule } from '../color/color.module';
import { MakeModule } from '../make/make.module';
import { ModelModule } from '../model/model.module';
import { VehicleTypeModule } from '../vehicle-type/vehicle-type.module';
import { VehicleServiceResolver } from './vehicle-service.resolver';
import { VehicleServiceService } from './vehicle-service.service';

@Module({
  imports: [VehicleTypeModule, ModelModule, MakeModule, ColorModule],
  providers: [VehicleServiceResolver, VehicleServiceService],
})
export class VehicleServiceModule {}
