import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dtos/create-reservation.dto';

@Injectable()
export class ReservationService {
  private logger = new Logger('ReservationService');

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  public async getReservationById(
    getReservationByIdDto: GetReservationByIdDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received get reservation with payload ${JSON.stringify(
        getReservationByIdDto,
      )}`,
    );

    const result = await this.reservationRepository.findOne(
      getReservationByIdDto,
    );

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getAllReservations(): Promise<Reservation[]> {
    this.logger.debug(`Received get all reservations`);

    return this.reservationRepository.find();
  }

  //TODO: implement creation logic
  public async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return;
  }

  public async updateReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    //TODO: implement update logic

    return;
  }

  public async cancelReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    //TODO: implement cancel logic

    return;
  }
}
