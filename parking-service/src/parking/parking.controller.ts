import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateParkingDto } from './dtos/create-parking.dto';
import { FilterDto } from './dtos/filter.dto';
import { GetAllMyParkingsDto } from './dtos/get-all-my-parkings.dto';
import { UpdateParkingDto } from './dtos/update-parking.dto';
import { Parking } from './entities/parking.entity';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  private logger = new Logger('Parking Controller');
  constructor(private parkingService: ParkingService) {}

  @MessagePattern({ type: 'get-parking-by-id' })
  public async getParkingById(id: string): Promise<Parking> {
    this.logger.debug(
      `Received id parking message with data ${JSON.stringify(id)}`,
    );
    return await this.parkingService.getParkingById(id);
  }

  @MessagePattern({ type: 'get-all-parkings' })
  public async getAllParkings(filterDto: FilterDto): Promise<Parking[]> {
    return await this.parkingService.getAllParkings(filterDto);
  }

  @MessagePattern({ type: 'get-all-my-parkings' })
  public async getAllUserParkings(
    getAllMyParkingsDto: GetAllMyParkingsDto,
  ): Promise<Parking[]> {
    return await this.parkingService.getAllMyParkings(getAllMyParkingsDto);
  }

  @MessagePattern({ type: 'create-parking' })
  public async createParking(
    createParkingDto: CreateParkingDto,
  ): Promise<Parking> {
    return await this.parkingService.createParking(createParkingDto);
  }

  //TODO: fix logic to update a parking
  @MessagePattern({ type: 'update-parking' })
  public async updateParking(
    updateParkingDto: UpdateParkingDto,
  ): Promise<Parking> {
    return await this.parkingService.updateParking(updateParkingDto);
  }
}
