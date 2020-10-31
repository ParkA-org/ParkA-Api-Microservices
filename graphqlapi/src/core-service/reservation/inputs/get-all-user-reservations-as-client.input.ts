import { IGetAllUserReservationsInput } from '../interfaces/get-all-user-reservations-input.interface';
import { UserRoles } from '../utils/user-roles';

export class GetAllUserReservationsInput
  implements IGetAllUserReservationsInput {
  role: UserRoles;
  id: string;
}
