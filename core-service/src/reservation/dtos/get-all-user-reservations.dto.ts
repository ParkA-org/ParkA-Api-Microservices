import { IGetAllUserReservations } from '../interfaces/get-all-user-reservations-dto.interface';
import { UserRoles } from '../utils/user-roles';

export class GetAllUserReservations implements IGetAllUserReservations {
  role: UserRoles;
  id: string;
}
