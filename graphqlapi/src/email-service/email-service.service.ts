import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfirmEmailInput } from './inputs/confirm-email.input';
import { ValidateEmailCodeInput } from './inputs/validate-email-code.input';
import { ConfirmEmailType } from './types/confirm-email.type';

@Injectable()
export class EmailServiceService {
  private logger = new Logger('EmailServiceService');

  @Client({
    transport: Transport.REDIS,
    options: { url: `redis://redis-parka-microservices:6379` },
  })
  client: ClientProxy;

  public async confirmEmail(
    confirmEmailInput: ConfirmEmailInput,
  ): Promise<ConfirmEmailType> {
    this.logger.log(`Got resend email data`);
    const response = this.client.send<ConfirmEmailType>(
      { type: 'resend-email' },
      confirmEmailInput,
    );
    return response.toPromise();
  }

  public async validateEmailCode(
    validateEmailCodeInput: ValidateEmailCodeInput,
  ): Promise<ConfirmEmailType> {
    this.logger.log('Got validate email code');
    const response = this.client.send<ConfirmEmailType>(
      { type: 'validate-email-code' },
      validateEmailCodeInput,
    );
    return response.toPromise();
  }
}
