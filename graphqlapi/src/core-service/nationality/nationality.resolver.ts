import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNationalityInput } from './inputs/create-nationality.input';
import { GetNationalityByIdInput } from './inputs/get-nationality-by-id.input';
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
}
