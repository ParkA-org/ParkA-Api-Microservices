import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from './strategy/auth.guard';
import { AuthServiceService } from './auth-service.service';
import { UpdateUserInput } from './user-input/update-user.input';
import { CreateUserInput, LoginUserInput } from './user-input/user.input';
import { LoginType } from './user-type/login.type';
import { UserType } from './user-type/user.type';
import * as jwt from 'jsonwebtoken';

@Resolver(of => UserType)
export class AuthServiceResolver {
  constructor(private authServiceService: AuthServiceService) {}

  @Query(returns => UserType)
  @UseGuards(AuthGuard)
  user(@Args('id') id: string) {
    return this.authServiceService.getUserById(id);
  }

  @Query(returns => [UserType])
  @UseGuards(AuthGuard)
  users() {
    return this.authServiceService.getAllUsers();
  }

  @Mutation(returns => UserType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    const user = await this.authServiceService.createUser(createUserInput);
    if (!user) {
      throw new BadRequestException('This user are exists');
    }
    await this.authServiceService.confirmUser(user.email);
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
      await this.authServiceService.confirmUser(login.user.email);
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
  ): Promise<UserType> {
    return await this.authServiceService.updateUser(updateUserInput);
  }
}
