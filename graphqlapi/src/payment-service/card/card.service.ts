import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateCardInput } from './inputs/create-card.input';
import { GetCardByIdInput } from './inputs/get-card-by-id.input';
import { CardType } from './types/card.type';

@Injectable()
export class CardService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS,
    },
  })
  private client: ClientProxy;

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
      { type: 'get-payment' },
      getCardByIdInput,
    );
    return response.toPromise();
  }
}
