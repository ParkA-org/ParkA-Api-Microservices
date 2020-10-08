import { Test, TestingModule } from '@nestjs/testing';
import { ParkingServiceService } from './parking-service.service';

describe('ParkingServiceService', () => {
  let service: ParkingServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingServiceService],
    }).compile();

    service = module.get<ParkingServiceService>(ParkingServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
