import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @MessagePattern({ type: 'get-all-reservations' })
  public async getAllReservations(): Promise<Reservation[]> {
    return this.reservationService.getAllReservations();
  }
}
