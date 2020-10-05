import { Module } from '@nestjs/common';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';
@Module({
  providers: [CardResolver, CardService],
  exports: [CardService],
})
export class CardModule {}
