import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfirmEmail } from 'src/email/entities/confirm-email.entity';
import { ResetPassword } from 'src/email/entities/reset-password.entity';
import { User } from 'src/email/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:
    'mongodb+srv://parkaApiUser:vUrmea2Sp4SSCBWj@parkawebapimicroservice.br7y0.mongodb.net/ParkaMicroservices?retryWrites=true&w=majority',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: true,
  entities: [ConfirmEmail, User, ResetPassword],
};
