import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  private logger = new Logger('ReservationController');

  constructor(private reservationService: ReservationService) {}

  @MessagePattern({ type: 'get-reservation-by-id' })
  public async getReservationById(
    getReservationByIdDto: GetReservationByIdDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received get reservation with payload ${JSON.stringify(
        getReservationByIdDto,
      )}`,
    );

    return this.reservationService.getReservationById(getReservationByIdDto);
  }

  @MessagePattern({ type: 'get-all-reservations' })
  public async getAllReservations(): Promise<Reservation[]> {
    this.logger.debug(`Received get all reservations`);

    return this.reservationService.getAllReservations();
  }
}
