import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailServiceService } from './email-service.service';
import { ConfirmEmailInput } from './inputs/confirm-email.input';
import { ConfirmEmailType } from './types/confirm-email.type';

@Resolver(of => ConfirmEmailType)
export class EmailServiceResolver {
  constructor(private emailServiceService: EmailServiceService) {}

  @Mutation(returns => ConfirmEmailType)
  async confirmEmail(
    @Args('confirmEmailInput') confirmEmailInput: ConfirmEmailInput,
  ): Promise<ConfirmEmailType> {
    return await this.emailServiceService.confirmEmail(confirmEmailInput);
  }
}
