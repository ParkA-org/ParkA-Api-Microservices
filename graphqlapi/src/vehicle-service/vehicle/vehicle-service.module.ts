import { Module } from '@nestjs/common';
import { ColorModule } from '../colors/color.module';
import { MakeModule } from '../make/make.module';
import { VehicleModelModule } from '../vehicle-model/vehicle-model.module';
import { VehicleTypeModule } from '../vehicle-type/vehicle-type.module';
import { VehicleServiceResolver } from './vehicle-service.resolver';
import { VehicleServiceService } from './vehicle-service.service';

@Module({
  imports: [VehicleTypeModule, VehicleModelModule, MakeModule, ColorModule],
  providers: [VehicleServiceResolver, VehicleServiceService],
})
export class VehicleServiceModule {}
