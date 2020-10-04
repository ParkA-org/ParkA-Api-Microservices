import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServiceService } from './payment-service.service';

describe('PaymentServiceService', () => {
  let service: PaymentServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentServiceService],
    }).compile();

    service = module.get<PaymentServiceService>(PaymentServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
