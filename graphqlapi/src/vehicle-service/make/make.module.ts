import { Module } from '@nestjs/common';
import { VehicleModelModule } from '../vehicle-model/vehicle-model.module';
import { MakeResolver } from './make.resolver';
import { MakeService } from './make.service';

@Module({
  imports: [VehicleModelModule],
  providers: [MakeService, MakeResolver],
  exports: [MakeService],
})
export class MakeModule {}
