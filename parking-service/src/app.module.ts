import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingModule } from './parking/parking.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [ParkingModule, FeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
