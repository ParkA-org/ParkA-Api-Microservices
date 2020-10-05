import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Card } from 'src/card/entities/card.entity';
import { Payment } from 'src/payment/entities/payment.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:
    'mongodb+srv://parkaApiUser:vUrmea2Sp4SSCBWj@parkawebapimicroservice.br7y0.mongodb.net/ParkaMicroservices?retryWrites=true&w=majority',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: true,
  entities: [Card, Payment],
};
