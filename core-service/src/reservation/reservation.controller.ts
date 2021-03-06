import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CancelReservationDto } from './dtos/cancel-reservation.dto';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { GetAllUserReservations } from './dtos/get-all-user-reservations.dto';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { GetReservationsInsightsInput } from './dtos/get-reservations-insights.dto';
import { UpdateReservationFromCronJobDto } from './dtos/update-reservation-from-cron-job.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationInsights } from './entities/reservations-insights.type';
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

  @MessagePattern({ type: 'get-all-user-reservations-as-client' })
  public async getAllUserReservationsAsClient(
    getAllUserReservations: GetAllUserReservations,
  ): Promise<Reservation[]> {
    this.logger.debug(`Received get all user reservations`);

    return this.reservationService.getAllUserReservationsAsClient(
      getAllUserReservations,
    );
  }

  @MessagePattern({ type: 'get-user-reservations-insigths-by-year' })
  public async getUserReservationsInsights(
    getReservationInsightsInputs: GetReservationsInsightsInput,
  ): Promise<ReservationInsights> {
    this.logger.debug(`Received get all user reservations`);

    return this.reservationService.getUserReservationInsights(
      getReservationInsightsInputs,
    );
  }

  @MessagePattern({ type: 'create-reservation' })
  public async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received create reservation with payload ${JSON.stringify(
        createReservationDto,
      )}`,
    );

    return this.reservationService.createReservation(createReservationDto);
  }

  @MessagePattern({ type: 'update-reservation' })
  public async updateReservation(
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received update reservation with payload ${JSON.stringify(
        updateReservationDto,
      )}`,
    );

    return this.reservationService.updateReservation(updateReservationDto);
  }

  @MessagePattern({ type: 'update-reservation-from-cron-job' })
  public async updateReservationFromCronJob(
    updateReservationFromCronJobDto: UpdateReservationFromCronJobDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received update reservation with payload ${JSON.stringify(
        updateReservationFromCronJobDto,
      )}`,
    );

    return this.reservationService.updateReservationFromCronJob(
      updateReservationFromCronJobDto,
    );
  }

  @MessagePattern({ type: 'update-reservation-reviewed' })
  public async updateReservationReviewed(
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received update reservation reviewed with payload ${JSON.stringify(
        updateReservationDto,
      )}`,
    );

    return this.reservationService.updateReservationReviewed(
      updateReservationDto,
    );
  }

  @MessagePattern({ type: 'cancel-reservation' })
  public async cancelReservation(
    cancelReservationDto: CancelReservationDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received cancel reservation with payload ${JSON.stringify(
        cancelReservationDto,
      )}`,
    );

    return this.reservationService.cancelReservation(cancelReservationDto);
  }

  @MessagePattern({ type: 'confirm-reservation' })
  public async confirmReservation() {}
}
