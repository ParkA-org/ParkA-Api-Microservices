import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Feature } from './entities/feature.entity';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
  controllers: [FeatureController],
  providers: [FeatureService],
  imports: [TypeOrmModule.forFeature([Feature])],
})
export class FeatureModule {}
