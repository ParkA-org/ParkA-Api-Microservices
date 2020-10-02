import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @MessagePattern({ type: 'get-reservation-by-id' })
  public async getReservationById(
    getReservationByIdDto: GetReservationByIdDto,
  ): Promise<Reservation> {
    return this.reservationService.getReservationById(getReservationByIdDto);
  }

  @MessagePattern({ type: 'get-all-reservations' })
  public async getAllReservations(): Promise<Reservation[]> {
    return this.reservationService.getAllReservations();
  }
}
