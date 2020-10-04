import { Module } from '@nestjs/common';
import { CountryModule } from '../country/country.module';
import { NationalityModule } from '../nationality/nationality.module';
import { UserInformationResolver } from './user-information.resolver';
import { UserInformationService } from './user-information.service';

@Module({
  imports: [CountryModule, NationalityModule],
  providers: [UserInformationResolver, UserInformationService],
})
export class UserInformationModule {}
