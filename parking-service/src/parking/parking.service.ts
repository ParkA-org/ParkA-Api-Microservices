import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, getMongoRepository, Repository } from 'typeorm';
import { CreateParkingDto } from './dtos/create-parking.dto';
import { Parking } from './entities/parking.entity';
import { v4 as uuid } from 'uuid';
import { UpdateParkingDto } from './dtos/update-parking.dto';
import { GetAllMyParkingsDto } from './dtos/get-all-my-parkings.dto';
import { Calendar } from 'src/calendar/entities/calendar.entity';
import { FilterDto } from './dtos/filter.dto';
import { graphqlToMongoQueryUtil } from 'src/utils/graphql-to-mongo-query.util';
import { VoteParkingDto } from './dtos/vote-parking.dto';

@Injectable()
export class ParkingService {
  private logger = new Logger('ParkingService');

  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
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
      createdParking.isAvailable = true;
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
      createdParking.rating = 5;
      createdParking.totalReviews = 1;
      createdParking.position = {
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
        type: 'Point',
      };

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
      throw new RpcException('Parking not found');
    }

    const calendarToUpdate = await this.calendarRepository.findOne({
      id: parking.calendar,
    });

    if (!calendarToUpdate) {
      throw new RpcException('Calendar not found');
    }

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const updateFieldList = Object.keys(updateParkingDto);

      for (const field of updateFieldList) {
        if (field != 'calendar') {
          parking[field] = updateParkingDto[field];
        }
      }

      parking.updatedAt = new Date().toISOString();

      const { calendar } = updateParkingDto;

      if (calendar) {
        const calendarFieldToUpdate = Object.keys(calendarToUpdate);
        for (const field of calendarFieldToUpdate) {
          if (calendar[field]) {
            calendarToUpdate[field] = calendar[field];
          }
        }

        calendarToUpdate.updatedAt = new Date().toISOString();

        await queryRunner.manager.save(calendarToUpdate);
      }

      await queryRunner.manager.save(parking);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return parking;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new RpcException('An undefined error occured');
    }
  }

  public async getParkingById(id: string): Promise<Parking> {
    this.logger.debug(`Received get parking by ID`);
    const parking = await this.parkingRepository.findOne({ id: id });
    if (!parking) {
      throw new RpcException('Entry not found');
    }
    return parking;
  }

  public async getAllParkings(filterDto: FilterDto): Promise<Parking[]> {
    this.logger.debug(
      `Received get all parkings with ${JSON.stringify(filterDto)}`,
    );

    let queryBuilder = {};

    const { limit, start, where } = filterDto;

    if (limit) {
      queryBuilder = { ...queryBuilder, take: limit };
    }

    if (start) {
      queryBuilder = { ...queryBuilder, skip: start };
    }

    if (where) {
      const convertedWhereFilter = graphqlToMongoQueryUtil(where);
      queryBuilder = { ...queryBuilder, where: convertedWhereFilter };
    }

    // console.log(queryBuilder);

    const result = await this.parkingRepository.find(queryBuilder);

    return result;
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

  public async reviewParking(rateParking: VoteParkingDto) {
    const { calification, id } = rateParking;

    const parkingToVote = await this.parkingRepository.findOne({ id: id });

    if (!parkingToVote) {
      throw new RpcException('Parking not found');
    }

    parkingToVote.totalReviews += 1;

    const newRating =
      (parkingToVote.rating + calification) / parkingToVote.totalReviews;

    parkingToVote.rating = newRating;

    return this.parkingRepository.save(parkingToVote);
  }
}
