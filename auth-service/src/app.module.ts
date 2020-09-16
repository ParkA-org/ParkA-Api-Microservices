import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/userData/user.entity';

//vUrmea2Sp4SSCBWj
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://parkaApiUser:vUrmea2Sp4SSCBWj@parkawebapimicroservice.br7y0.mongodb.net/<dbname>?retryWrites=true&w=majority',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [User],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
