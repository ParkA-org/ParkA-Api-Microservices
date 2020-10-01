import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailServiceService } from './email-service.service';
import { ConfirmEmailInput } from './inputs/confirm-email.input';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { ValidateEmailCodeInput } from './inputs/validate-email-code.input';
import { ConfirmEmailType } from './types/confirm-email.type';
import { ResetPasswordType } from './types/reset-password.type';

@Resolver(of => ConfirmEmailType)
export class EmailServiceResolver {
  constructor(private emailServiceService: EmailServiceService) {}
  @Mutation(returns => ConfirmEmailType)
  async confirmEmail(
    @Args('confirmEmailInput') confirmEmailInput: ConfirmEmailInput,
  ): Promise<ConfirmEmailType> {
    return await this.emailServiceService.confirmEmail(confirmEmailInput);
  }

  @Mutation(returns => ConfirmEmailType)
  async validateEmailCode(
    @Args('validateEmailCodeInput')
    validateEmailCodeInput: ValidateEmailCodeInput,
  ): Promise<ConfirmEmailType> {
    return await this.emailServiceService.validateEmailCode(
      validateEmailCodeInput,
    );
  }

  @Mutation(returns => ResetPasswordType)
  async resetPassword(
    @Args('resetPasswordInput')
    resetPasswordInput: ResetPasswordInput,
  ): Promise<ResetPasswordType> {
    return await this.emailServiceService.resetPassword(resetPasswordInput);
  }
}
