import { Module } from '@nestjs/common';
import { ModelModule } from '../model/model.module';
import { MakeResolver } from './make.resolver';
import { MakeService } from './make.service';

@Module({
  imports: [ModelModule],
  providers: [MakeService, MakeResolver],
  exports: [MakeService],
})
export class MakeModule {}
