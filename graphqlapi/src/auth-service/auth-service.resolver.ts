import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthServiceService } from './auth-service.service';
import { UserType } from './user-data/user.type';

@Resolver(of => UserType)
export class AuthServiceResolver {
  constructor(private authServiceService: AuthServiceService) {}

  @Query(returns => UserType)
  user(@Args('id') id: string) {
    return this.authServiceService.getUserById(id);
  }

  @Mutation(returns => UserType)
  async createUser(): Promise<UserType> {
    return await {
      id: '12345',
      name: 'test name',
      lastName: 'test lastName',
      email: 'uncorreoporahi@gmail.com',
      profilePicture: '',
    };
  }
}
