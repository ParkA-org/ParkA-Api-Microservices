import { UnauthorizedException, UseGuards } from '@nestjs/common';
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
  user(@Args('id') id: string) {
    return this.authServiceService.getUserById(id);
  }

  @Query(returns => [UserType])
  users() {
    return this.authServiceService.getAllUsers();
  }

  @Mutation(returns => UserType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    return await this.authServiceService.createUser(createUserInput);
  }

  @Mutation(returns => LoginType)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginType> {
    const login = await this.authServiceService.login(loginUserInput);
    var user = new UserType();
    if (!login) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const accessToken = jwt.sign(
      { email: login.user.email, id: login.user.id },
      'secret',
      {
        expiresIn: '100d',
      },
    );
    login.JWT = accessToken;
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
