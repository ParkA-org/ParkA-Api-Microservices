import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthGuard } from './strategy/auth.guard';
import { AuthServiceService } from './auth-service.service';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/user.input';
import { LoginUserInput } from './inputs/login-user.input';
import { LoginType } from './types/login.type';
import { UserType } from './types/user.type';
import { UpdateUserPasswordInput } from './inputs/update-user-password.input';
import { ConfirmEmailInput } from 'src/email-service/inputs/confirm-email.input';
import { JWTpayload } from './types/jwt.type';
import { AdvancedConsoleLogger } from 'typeorm';

@Resolver(of => UserType)
export class AuthServiceResolver {
  constructor(private authServiceService: AuthServiceService) {}

  @Query(returns => UserType)
  @UseGuards(AuthGuard)
  getUserById(@Args('id') id: string) {
    return this.authServiceService.getUserById(id);
  }

  @Query(returns => [UserType])
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.authServiceService.getAllUsers();
  }

  @Mutation(returns => UserType)
  async updateUserPassword(
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordInput,
  ): Promise<UserType> {
    const user = await this.authServiceService.updateUserPassword(
      updateUserPasswordInput,
    );
    return user;
  }

  @Mutation(returns => UserType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    const user = await this.authServiceService.createUser(createUserInput);
    if (!user) {
      throw new BadRequestException('This user already exists');
    }

    const confirmEmail = new ConfirmEmailInput();
    confirmEmail.email = user.email;
    confirmEmail.origin = user.origin;
    await this.authServiceService.confirmUser(confirmEmail);
    return user;
  }

  @Mutation(returns => LoginType)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginType> {
    const login = await this.authServiceService.login(loginUserInput);
    if (!login) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (!login.user.confirmed) {
      throw new UnauthorizedException(
        'Confirm your account ' + login.user.email,
      );
    }
    return login;
  }

  @Mutation(returns => UserType)
  @UseGuards(AuthGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context('user') user: JWTpayload,
  ): Promise<UserType> {
    return await this.authServiceService.updateUser(updateUserInput, user);
  }
}
