import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [ParkingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
