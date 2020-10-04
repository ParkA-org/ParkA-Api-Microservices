import { Module } from '@nestjs/common';
import { NationalityResolver } from './nationality.resolver';
import { NationalityService } from './nationality.service';

@Module({
  providers: [NationalityResolver, NationalityService],
})
export class NationalityModule {}
