import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CardService } from './card.service';
import { CreateCardDto } from './dtos/create-card.dto';
import { GetCardDto } from './dtos/get-card.dto';
import { Card } from './entities/card.entity';

@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @MessagePattern({ type: 'create-card' })
  public async createPayment(createCardDto: CreateCardDto): Promise<Card> {
    return await this.cardService.createCard(createCardDto);
  }

  @MessagePattern({ type: 'get-card' })
  public async getCardById(getCardDto: GetCardDto): Promise<Card> {
    return await this.cardService.getCardById(getCardDto);
  }

  @MessagePattern({ type: 'get-all-cards' })
  public async getAllCards(): Promise<Card[]> {
    return await this.cardService.getAllCards();
  }
}
