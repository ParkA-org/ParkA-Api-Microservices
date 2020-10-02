import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  public async getReservationById(
    getReservationByIdDto: GetReservationByIdDto,
  ): Promise<Reservation> {
    return this.reservationRepository.findOne(getReservationByIdDto);
  }

  public async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }
}
