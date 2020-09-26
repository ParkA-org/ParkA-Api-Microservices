import { UnauthorizedException } from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceService } from './auth-service.service';
import { UpdateUserInput } from './user-input/update-user.input';
import { CreateUserInput, LoginUserInput } from './user-input/user.input';
import { LoginType } from './user-type/login.type';
import { UserType } from './user-type/user.type';

@Resolver(of => UserType)
export class AuthServiceResolver {
  constructor(
    private authServiceService: AuthServiceService,
    private jwtService: JwtService,
  ) {}

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
    if (!login) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = await this.jwtService.sign(login.user);
    login.JWT = accessToken;
    return login;
  }

  @Mutation(returns => UserType)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<UserType> {
    return await this.authServiceService.updateUser(updateUserInput);
  }
}
