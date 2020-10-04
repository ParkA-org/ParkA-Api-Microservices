import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServiceController } from './payment-service.controller';

describe('PaymentServiceController', () => {
  let controller: PaymentServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentServiceController],
    }).compile();

    controller = module.get<PaymentServiceController>(PaymentServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
