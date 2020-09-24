import { Module } from '@nestjs/common';
import { ModelResolver } from './model.resolver';
import { ModelService } from './model.service';

@Module({
  providers: [ModelResolver, ModelService],
  exports: [ModelService],
})
export class ModelModule {}
