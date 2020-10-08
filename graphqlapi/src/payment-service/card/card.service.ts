import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCardInput } from './inputs/create-card.input';
import { GetCardByIdInput } from './inputs/get-card-by-id.input';
import { CardType } from './types/card.type';

@Injectable()
export class CardService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async createCard(createCardInput: CreateCardInput): Promise<CardType> {
    const response = await this.client.send<CardType>(
      { type: 'create-card' },
      createCardInput,
    );
    return response.toPromise();
  }

  public async getCardById(
    getCardByIdInput: GetCardByIdInput,
  ): Promise<CardType> {
    const response = await this.client.send<CardType>(
      { type: 'get-card' },
      getCardByIdInput,
    );
    return response.toPromise();
  }

  public async getAllCards(): Promise<[CardType]> {
    const response = await this.client.send<[CardType]>(
      { type: 'get-all-cards' },
      {},
    );
    return response.toPromise();
  }
}
