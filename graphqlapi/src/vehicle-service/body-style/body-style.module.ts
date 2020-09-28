import { Module } from '@nestjs/common';
import { BodyStyleResolver } from './body-style.resolver';
import { BodyStyleService } from './body-style.service';

@Module({
  providers: [BodyStyleResolver, BodyStyleService],
  exports: [BodyStyleService],
})
export class BodyStyleModule {}
