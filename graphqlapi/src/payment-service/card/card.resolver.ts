import { BadRequestException, Logger, UseGuards } from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { CardService } from './card.service';
import { CreateCardInput } from './inputs/create-card.input';
import { GetCardByIdInput } from './inputs/get-card-by-id.input';
import { CardType } from './types/card.type';
@Resolver(of => CardType)
export class CardResolver {
  private logger = new Logger('CardResolver');

  constructor(private cardService: CardService) {}

  @Query(returns => CardType)
  getCardById(@Args('getCardByIdInput') getCardByIdInput: GetCardByIdInput) {
    this.logger.debug(
      `Received get card id data ${JSON.stringify(getCardByIdInput)}`,
    );
    return this.cardService.getCardById(getCardByIdInput);
  }

  @Mutation(returns => CardType)
  @UseGuards(AuthGuard)
  async createCard(
    @Args('createCardInput') createCardInput: CreateCardInput,
  ): Promise<CardType> {
    this.logger.debug(
      `Received create card data ${JSON.stringify(createCardInput)}`,
    );
    const card = await this.cardService.createCard(createCardInput);
    if (!card) {
      throw new BadRequestException('This card already exists');
    }
    return card;
  }

  @Query(returns => [CardType])
  async getAllCards(): Promise<[CardType]> {
    this.logger.debug(`Received get all cards`);
    return await this.cardService.getAllCards();
  }
}
