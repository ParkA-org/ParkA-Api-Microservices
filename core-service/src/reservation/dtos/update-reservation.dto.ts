import { GetReservationByIdDto } from './get-reservation-by-id.dto';
import { UpdateReservationPayload } from './update-reservation.payload';

export class UpdateReservationDto implements IUpdateReservationDto {
  where: GetReservationByIdDto;
  data: UpdateReservationPayload;
}
