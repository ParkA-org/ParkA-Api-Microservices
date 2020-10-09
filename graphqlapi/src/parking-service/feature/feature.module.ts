import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';

@Module({
  exports: [FeatureService],
  providers: [FeatureService, FeatureResolver],
})
export class FeatureModule {}
