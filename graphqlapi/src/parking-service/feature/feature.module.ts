import { Module } from '@nestjs/common';
import { FeatureResolver } from './feature.resolver';
import { FeatureService } from './feature.service';

@Module({
  exports: [FeatureService],
  providers: [FeatureService, FeatureResolver],
})
export class FeatureModule {}
