import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateParkingDto } from './dtos/create-parking.dto';
import { UpdateParkingDto } from './dtos/update-parking.dto';
import { Parking } from './entities/parking.entity';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
    private logger = new Logger('Parking Controller');
    constructor(private parkingService: ParkingService) {}
  
    @MessagePattern({ type: 'get-parking' })
    public async getParking(id: string): Promise<Parking> {
      this.logger.debug(
        `Received id parking message with data ${JSON.stringify(id)}`,
      );
      return await this.parkingService.getParking(id);
    }
  
    @MessagePattern({ type: 'get-parkings' })
    public async getAllParkings(): Promise<Parking[]> {
      return await this.parkingService.getAllParkings();
    }
  
    @MessagePattern({ type: 'create-parking' })
    public async createParking(createParkingDto: CreateParkingDto): Promise<Parking> {
      return await this.parkingService.createParking(createParkingDto);
    }

    @MessagePattern({ type: 'update-parking' })
    public async updateParking(updateParkingDto: UpdateParkingDto): Promise<Parking> {
      return await this.parkingService.updateParking(updateParkingDto);
    }
  
}
