import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateReservationDto } from './dtos/create-reservation.dto';
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

  @MessagePattern({ type: 'create-reservation' })
  public async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    this.logger.debug(`Received create reservation`);

    return this.reservationService.createReservation(createReservationDto);
  }

  @MessagePattern({ type: 'update-reservation' })
  public async updateReservation(
    //TODO: change parameter type and name
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    //TODO: update update logic

    return this.reservationService.updateReservation(createReservationDto);
  }

  @MessagePattern({ type: 'cancel-reservation' })
  public async cancelReservation(
    //TODO: change parameter type and name
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    //TODO: update cancel logic

    return this.cancelReservation(createReservationDto);
  }
}
