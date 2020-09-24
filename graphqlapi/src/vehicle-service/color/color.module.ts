import { Module } from '@nestjs/common';
import { ColorResolver } from './color.resolver';
import { ColorService } from './color.service';

@Module({
  providers: [ColorResolver, ColorService],
  exports: [ColorService],
})
export class ColorModule {}
