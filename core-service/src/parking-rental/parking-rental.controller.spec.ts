import { Test, TestingModule } from '@nestjs/testing';
import { ParkingRentalController } from './parking-rental.controller';

describe('ParkingRentalController', () => {
  let controller: ParkingRentalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingRentalController],
    }).compile();

    controller = module.get<ParkingRentalController>(ParkingRentalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
