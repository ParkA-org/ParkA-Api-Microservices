import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { ConfirmEmailInput } from './inputs/confirm-email.input';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { ValidateEmailCodeInput } from './inputs/validate-email-code.input';
import { ValidateResetPasswordCodeInput } from './inputs/validate-reset-password-code.input';
import { ConfirmEmailType } from './types/confirm-email.type';
import { ResetPasswordType } from './types/reset-password.type';

@Resolver(of => ConfirmEmailType)
export class EmailResolver {
  constructor(private emailService: EmailService) {}
  @Mutation(returns => ConfirmEmailType)
  async confirmEmail(
    @Args('confirmEmailInput') confirmEmailInput: ConfirmEmailInput,
  ): Promise<ConfirmEmailType> {
    return await this.emailService.confirmEmail(confirmEmailInput);
  }

  @Mutation(returns => ConfirmEmailType)
  async validateEmailCode(
    @Args('validateEmailCodeInput')
    validateEmailCodeInput: ValidateEmailCodeInput,
  ): Promise<ConfirmEmailType> {
    return await this.emailService.validateEmailCode(validateEmailCodeInput);
  }

  @Mutation(returns => ResetPasswordType)
  async validateResetPasswordCode(
    @Args('validateResetPasswordCodeInput')
    validateResetPasswordCodeInput: ValidateResetPasswordCodeInput,
  ): Promise<ResetPasswordType> {
    return await this.emailService.validateResetPasswordCode(
      validateResetPasswordCodeInput,
    );
  }

  @Mutation(returns => ResetPasswordType)
  async resetPassword(
    @Args('resetPasswordInput')
    resetPasswordInput: ResetPasswordInput,
  ): Promise<ResetPasswordType> {
    return await this.emailService.resetPassword(resetPasswordInput);
  }
}
