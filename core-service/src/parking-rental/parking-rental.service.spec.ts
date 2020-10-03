import { Test, TestingModule } from '@nestjs/testing';
import { ParkingRentalService } from './parking-rental.service';

describe('ParkingRentalService', () => {
  let service: ParkingRentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingRentalService],
    }).compile();

    service = module.get<ParkingRentalService>(ParkingRentalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
