import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetParkingCalendarInput } from './inputs/get-parking-avaliability.input';
import { ParkingCalendarService } from './parking-calendar.service';
import { ParkingCalendarType } from './types/calendar.type';

@Resolver(of => ParkingCalendarType)
export class ParkingCalendarResolver {
  constructor(
    private readonly parkingCalendarService: ParkingCalendarService,
  ) {}

  @Query(returns => [ParkingCalendarType])
  public async getParkingAvaliability(
    @Args('getParkingCalendarInput')
    getParkingCalendarInput: GetParkingCalendarInput,
  ): Promise<ParkingCalendarType[]> {
    return this.parkingCalendarService.getParkingAvaliability(
      getParkingCalendarInput,
    );
  }
}
