import { Module } from '@nestjs/common';
import { ColorModule } from '../color/color.module';
import { MakeModule } from '../make/make.module';
import { ModelModule } from '../model/model.module';
import { BodyStyleModule } from '../body-style/body-style.module';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';

@Module({
  exports: [VehicleService],
  imports: [BodyStyleModule, ModelModule, MakeModule, ColorModule],
  providers: [VehicleResolver, VehicleService],
})
export class VehicleModule {}
