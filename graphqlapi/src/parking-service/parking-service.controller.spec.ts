import { Test, TestingModule } from '@nestjs/testing';
import { ParkingServiceController } from './parking-service.controller';

describe('ParkingServiceController', () => {
  let controller: ParkingServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingServiceController],
    }).compile();

    controller = module.get<ParkingServiceController>(ParkingServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
