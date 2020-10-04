import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { CountryService } from '../country/country.service';
import { CountryType } from '../country/types/country.type';
import { NationalityService } from '../nationality/nationality.service';
import { NationalityType } from '../nationality/types/nationality.type';
import { CreateUserInformationInpuType } from './inputs/create-user-information.input';
import { GetUserInformationByIdInput } from './inputs/get-user-information-by-id.input';
import { UpdateUserInformationInternalInput } from './inputs/update-user-information-internal-input';
import { UpdateUserInformationInput } from './inputs/update-user-information.input';
import { UserInformationType } from './types/user-information.type';
import { UserInformationService } from './user-information.service';

@Resolver(of => UserInformationType)
export class UserInformationResolver {
  constructor(
    private userInformationService: UserInformationService,
    private countryService: CountryService,
    private nationalityService: NationalityService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(returns => UserInformationType)
  public async getUserInformationById(
    @Args('getUserInformationByIdInput')
    getUserInformationByIdInput: GetUserInformationByIdInput,
  ): Promise<UserInformationType> {
    return await this.userInformationService.getUserInformationById(
      getUserInformationByIdInput,
    );
  }

  @Mutation(of => UserInformationType)
  public async createUserInformation(
    @Args('createUserInformationInpuType')
    createUserInformationInpuType: CreateUserInformationInpuType,
  ): Promise<UserInformationType> {
    return this.userInformationService.createUserInformation(
      createUserInformationInpuType,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(of => UserInformationType)
  public async updateUserInformation(
    @Args('updateUserInformationInput')
    updateUserInformationInput: UpdateUserInformationInput,
    @Context('user') user: JWTpayload,
  ): Promise<UserInformationType> {
    const updateUserInformationInternalInput: UpdateUserInformationInternalInput = {
      getUserInformationByIdDto: {
        id: user.userInformation,
      },
      updateUserInformationPayloadDto: updateUserInformationInput,
    };

    return this.userInformationService.updateUserInformation(
      updateUserInformationInternalInput,
    );
  }

  //Field resolvers
  @ResolveField(returns => CountryType)
  public async placeOfBirth(
    @Parent() userInformation: UserInformationType,
  ): Promise<CountryType> {
    return this.countryService.getCountryById({
      id: userInformation.placeOfBirth,
    });
  }

  @ResolveField(returns => NationalityType)
  public async nationality(
    @Parent() userInformation: UserInformationType,
  ): Promise<NationalityType> {
    return this.nationalityService.getNationalityById({
      id: userInformation.nationality,
    });
  }
}
