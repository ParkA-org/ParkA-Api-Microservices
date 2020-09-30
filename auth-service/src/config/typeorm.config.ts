import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Credential } from 'src/auth/entities/credential.entity';
import { User } from 'src/auth/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:
    'mongodb+srv://parkaApiUser:vUrmea2Sp4SSCBWj@parkawebapimicroservice.br7y0.mongodb.net/ParkaMicroservices?retryWrites=true&w=majority',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: true,
  entities: [User, Credential],
};
