import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfirmEmailInput } from './inputs/confirm-email.input';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { ValidateEmailCodeInput } from './inputs/validate-email-code.input';
import { ValidateResetPasswordCodeInput } from './inputs/validate-reset-password-code.input';
import { ConfirmEmailType } from './types/confirm-email.type';
import { ResetPasswordType } from './types/reset-password.type';

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

  public async resetPassword(
    resetPasswordInput: ResetPasswordInput,
  ): Promise<ResetPasswordType> {
    this.logger.log(`Got reset password data`);
    const response = this.client.send<ResetPasswordType>(
      { type: 'reset-password' },
      resetPasswordInput,
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

  public async validateResetPasswordCode(
    validateResetPasswordCodeInput: ValidateResetPasswordCodeInput,
  ): Promise<ResetPasswordType> {
    this.logger.log('Got validate reset password code');
    const response = this.client.send<ResetPasswordType>(
      { type: 'validate-reset-password-code' },
      validateResetPasswordCodeInput,
    );
    return response.toPromise();
  }
}
