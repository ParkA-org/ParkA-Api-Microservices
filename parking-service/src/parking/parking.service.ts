import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateParkingDto } from './dtos/create-parking.dto';
import { Parking } from './entities/parking.entity';
import { v4 as uuid } from 'uuid';
import { UpdateParkingDto } from './dtos/update-parking.dto';
import { GetAllMyParkingsDto } from './dtos/get-all-my-parkings.dto';
import { Calendar } from 'src/calendar/entities/calendar.entity';

@Injectable()
export class ParkingService {
  private logger = new Logger('ParkingService');

  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async createParking(
    createParkingDto: CreateParkingDto,
  ): Promise<Parking> {
    this.logger.debug(
      `Received create vehicle with payload ${JSON.stringify(
        createParkingDto,
      )}`,
    );

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const {
        calendar,
        countParking,
        direction,
        features,
        information,
        latitude,
        longitude,
        mainPicture,
        parkingName,
        pictures,
        priceHours,
        sector,
        userInformation,
      } = createParkingDto;

      const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      } = calendar;

      const calendarId = uuid();
      const parkingId = uuid();

      const createdCalendar: Calendar = new Calendar();

      createdCalendar.id = calendarId;
      createdCalendar.parkingId = parkingId;
      createdCalendar.monday = monday;
      createdCalendar.tuesday = tuesday;
      createdCalendar.wednesday = wednesday;
      createdCalendar.thursday = thursday;
      createdCalendar.friday = friday;
      createdCalendar.saturday = saturday;
      createdCalendar.sunday = sunday;
      createdCalendar.createdAt = new Date().toISOString();
      createdCalendar.updatedAt = new Date().toISOString();

      const createdParking: Parking = new Parking();

      createdParking.id = parkingId;
      createdParking.isAvailable = false;
      createdParking.calendar = calendarId;
      createdParking.countParking = countParking;
      createdParking.features = features;
      createdParking.direction = direction;
      createdParking.information = information;
      createdParking.latitude = latitude;
      createdParking.longitude = longitude;
      createdParking.mainPicture = mainPicture;
      createdParking.parkingName = parkingName;
      createdParking.pictures = pictures;
      createdParking.priceHours = priceHours;

      createdParking.sector = sector;
      createdParking.userInformation = userInformation;
      createdParking.verified = false;
      createdParking.published = false;

      createdParking.createdAt = new Date().toISOString();
      createdParking.updatedAt = new Date().toISOString();

      await queryRunner.manager.save(createdCalendar);
      await queryRunner.manager.save(createdParking);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return await createdParking;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  //TODO: update this method to comply with the new data structure
  public async updateParking(
    updateParkingDto: UpdateParkingDto,
  ): Promise<Parking> {
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

  public async getParkingById(id: string): Promise<Parking> {
    this.logger.debug(`Received get parking by ID`);
    const parking = await this.parkingRepository.findOne({ id: id });
    if (!parking) {
      throw new RpcException('Entry not found');
    }
    return parking;
  }

  public async getAllParkings(): Promise<Parking[]> {
    this.logger.debug(`Received get all parkings`);
    return await this.parkingRepository.find();
  }

  public async getAllMyParkings(
    getAllMyParkingsDto: GetAllMyParkingsDto,
  ): Promise<Parking[]> {
    const { userInformationId } = getAllMyParkingsDto;

    this.logger.debug(`Received get all my parkings`);

    return await this.parkingRepository.find({
      userInformation: userInformationId,
    });
  }
}
