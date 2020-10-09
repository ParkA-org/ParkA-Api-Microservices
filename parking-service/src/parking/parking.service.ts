import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParkingDto } from './dtos/create-parking.dto';
import { Parking } from './entities/parking.entity';
import { v4 as uuid } from 'uuid';
import { UpdateParkingDto } from './dtos/update-parking.dto';

@Injectable()
export class ParkingService {
  private logger = new Logger('ParkingService');

  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
  ) {}

  public async createParking(createParkingDto: CreateParkingDto): Promise<Parking> {
      this.logger.debug(
            `Received create vehicle with payload ${JSON.stringify(
                createParkingDto,
            )}`,
      );

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
    
        return await parking;

      }catch(error){
        throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
      }
  }

  public async updateParking(updateParkingDto:UpdateParkingDto): Promise<Parking>{
    this.logger.debug(
        `Received update parking with payload ${JSON.stringify(
            updateParkingDto,
        )}`,
      );

      const { id } = updateParkingDto;
      const { userInformation } = updateParkingDto;
  
      const parking = await this.parkingRepository.findOne({
        userInformation: userInformation,
        id: id,
      });
  
      if (!parking) {
        throw new RpcException('Entry not found');
      }
  
      const updateFieldList = Object.keys(updateParkingDto);
  
      for (const field of updateFieldList) {
        parking[field] = updateParkingDto[field];
      }
  
      parking.updatedAt = new Date().toISOString();
  
      return await this.parkingRepository.save(parking);
  }

  public async getParkingById(id: string): Promise<Parking>{
    this.logger.debug(`Received get parking by ID`);
    const parking = await this.parkingRepository.findOne({id: id});
    if (!parking) {
        throw new RpcException('Entry not found');
    }
    return parking;
  }

  public async getAllParkings(): Promise<Parking[]> {
    this.logger.debug(`Received get all parkings`);
    return await this.parkingRepository.find();
  }

  public async getAllMyParkings(userInformation: string): Promise<Parking[]>{
    this.logger.debug(`Received get all my parkings`);
    return await this.parkingRepository.find({ userInformation: userInformation });
  }


}

