import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { v4 as uuid } from 'uuid';
import { CancelReservationDto } from './dtos/cancel-reservation.dto';
import { ReservationStatuses } from './utils/statuses';

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
    this.logger.debug(
      `Received create reservation with payload ${JSON.stringify(
        createReservationDto,
      )}`,
    );

    const {
      checkInDate,
      checkOutDate,
      client,
      owner,
      parking,
      paymentInfo,
      rentDate,
      total,
      vehicle,
    } = createReservationDto;

    const reservation = this.reservationRepository.create({
      id: uuid(),
      checkInDate,
      checkOutDate,
      client,
      owner,
      parking,
      paymentInfo,
      rentDate,
      status: ReservationStatuses.Created,
      total,
      vehicle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.reservationRepository.save(reservation);
  }

  public async updateReservation(
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const { data, where } = updateReservationDto;

    const reservation = await this.getReservationById(where);

    const fieldsToUpdate = Object.keys(data);

    for (const field of fieldsToUpdate) {
      reservation[field] = where[field];
    }

    reservation.updatedAt = new Date().toISOString();

    return this.reservationRepository.save(reservation);
  }

  public async cancelReservation(
    cancelReservationDto: CancelReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.getReservationById(cancelReservationDto);

    reservation.status = ReservationStatuses.Cancelled;

    return this.reservationRepository.save(reservation);
  }
}
