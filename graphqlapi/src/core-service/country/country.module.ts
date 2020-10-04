import { Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';

@Module({
  exports: [CountryService],
  providers: [CountryResolver, CountryService],
})
export class CountryModule {}
