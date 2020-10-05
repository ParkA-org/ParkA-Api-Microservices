import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCardDto } from './dtos/get-card.dto';
import { Card } from './entities/card.entity';
import { v4 as uuid } from 'uuid';
import { CreateCardDto } from './dtos/create-card.dto';

@Injectable()
export class CardService {
  private logger = new Logger('CardService');

  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  public async getCardById(getCardDto: GetCardDto): Promise<Card> {
    this.logger.debug(
      `Received get card by id with payload ${JSON.stringify(getCardDto)}`,
    );

    const result = await this.cardRepository.findOne(getCardDto);

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async createCard(createCardDto: CreateCardDto): Promise<Card> {
    this.logger.debug(
      `Received create card with payload ${JSON.stringify(createCardDto)}`,
    );

    const { name } = createCardDto;

    try {
      const card = this.cardRepository.create({
        id: uuid(),
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return await this.cardRepository.save(card);
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  public async getAllCards(): Promise<Card[]> {
    try {
      const card = this.cardRepository.find();
      return await card;
    } catch (error) {
      this.logger.debug(error);
    }
  }
}
