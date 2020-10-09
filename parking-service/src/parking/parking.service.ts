import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParkingDto } from './dtos/create-parking.dto';
import { Parking } from './entities/parking.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ParkingService {
  private logger = new Logger('ParkingService');

  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
  ) {}

  public async createParking(createParkingDto: CreateParkingDto): Promise<Parking> {
      try{
        const {calendar, countParking, direction, features, information, 
            latitude, longitude, mainPicture, parkingName, 
            pictures, priceHours, sector, userInformation} = createParkingDto;

        const parking = this.parkingRepository.save({
            id: uuid(),
            isAvailable: false,
            calendar,
            countParking,
            features,
            direction,
            information,
            latitude, 
            longitude,
            mainPicture,
            parkingName,
            pictures, 
            priceHours,
            sector,
            userInformation,
            verified: false,
            published: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
    
        return parking;

      }catch(error){
        throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
      }
  }

}
