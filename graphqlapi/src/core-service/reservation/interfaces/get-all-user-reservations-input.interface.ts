import { UserRoles } from '../utils/user-roles';

export interface IGetAllUserReservationsInput {
  id: string;
  role: UserRoles;
}
