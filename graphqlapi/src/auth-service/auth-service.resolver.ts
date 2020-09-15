import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './auth-service.type';
import { AuthServiceService } from './auth-service.service';
import { User } from './auth-service.entity';

@Resolver(of => UserType)
export class AuthServiceResolver {
  constructor(private authServiceService: AuthServiceService) {}

  @Query(returns => UserType)
  user(@Args('id') id: string) {
    return { id: 'helloworld v:' };
  }
}
