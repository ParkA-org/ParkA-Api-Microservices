import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { Reservation } from './entities/reservation.entity';

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

    return this.reservationRepository.findOne(getReservationByIdDto);
  }

  public async getAllReservations(): Promise<Reservation[]> {
    this.logger.debug(`Received get all reservations`);

    return this.reservationRepository.find();
  }
}
