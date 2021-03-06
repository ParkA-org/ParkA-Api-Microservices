import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { CreateNationalityInput } from './inputs/create-nationality.input';
import { GetNationalityByIdInput } from './inputs/get-nationality-by-id.input';
import { UpdateNationalityInput } from './inputs/update-nationality.input';
import { NationalityService } from './nationality.service';
import { NationalityType } from './types/nationality.type';

@Resolver(of => NationalityType)
export class NationalityResolver {
  private logger = new Logger('NationalityResolver');

  constructor(private nationalityService: NationalityService) {}

  @Query(returns => NationalityType)
  public async getNationalityById(
    @Args('getNationalityByIdInput')
    getNationalityByIdInput: GetNationalityByIdInput,
  ): Promise<NationalityType> {
    this.logger.debug(
      `Received get nationality by id with payload ${JSON.stringify(
        getNationalityByIdInput,
      )}`,
    );

    return this.nationalityService.getNationalityById(getNationalityByIdInput);
  }

  @Query(returns => [NationalityType])
  public async getAllNationalities(): Promise<NationalityType[]> {
    this.logger.debug(`Received get all nationalities`);

    return this.nationalityService.getAllNationalities();
  }

  @Mutation(of => NationalityType)
  @UseGuards(AuthGuard)
  public async createNationality(
    @Args('createNationalityInput')
    createNationalityInput: CreateNationalityInput,
  ): Promise<NationalityType> {
    this.logger.debug(
      `Received create nationality with payload ${JSON.stringify(
        createNationalityInput,
      )}`,
    );

    return this.nationalityService.createNationality(createNationalityInput);
  }

  @Mutation(of => NationalityType)
  @UseGuards(AuthGuard)
  public async updateNationality(
    @Args('updateNationalityInput')
    updateNationalityInput: UpdateNationalityInput,
  ): Promise<NationalityType> {
    this.logger.debug(
      `Received create nationality with payload ${JSON.stringify(
        updateNationalityInput,
      )}`,
    );

    return this.nationalityService.updateNationality(updateNationalityInput);
  }
}
