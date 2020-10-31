import { registerEnumType } from '@nestjs/graphql';

export enum ReservationStatuses {
  Created = 'created',
  InProgress = 'in-progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

registerEnumType(ReservationStatuses, {
  name: 'ReservationStatuses',
});
