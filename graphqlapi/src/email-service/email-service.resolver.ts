import { BadRequestException } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ConfirmEmailInput } from './inputs/confirm-email.input';

@Resolver(of => UserType)
export class AuthServiceResolver {
  constructor(private authServiceService: AuthServiceService) {}

  @Mutation(returns => ConfirmEmailInput)
  async confirmEmail(
    @Args('confirmEmailInput') confirmEmailInput: ConfirmEmailInput,
  ): Promise<UserType> {
    const user = await this.authServiceService.createUser(confirmEmailInput);
    if (!user) {
      throw new BadRequestException('This user already exists');
    }
    // This part is for email services TO DO
    //await this.authServiceService.confirmUser(user.email);
    return user;
  }
}
