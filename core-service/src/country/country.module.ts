import { Module } from '@nestjs/common';
import { CountriesService } from './country.service';
import { CountriesController } from './country.controller';

@Module({
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {}
