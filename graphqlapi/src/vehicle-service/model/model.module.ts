import { forwardRef, Module } from '@nestjs/common';
import { MakeModule } from '../make/make.module';
import { ModelResolver } from './model.resolver';
import { ModelService } from './model.service';

@Module({
  imports: [forwardRef(() => MakeModule)],
  providers: [ModelResolver, ModelService],
  exports: [ModelService],
})
export class ModelModule {}
