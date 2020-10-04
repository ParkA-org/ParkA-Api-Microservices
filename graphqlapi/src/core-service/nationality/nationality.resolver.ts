import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetNationalityByIdInput } from './inputs/get-nationality-by-id.input';
import { NationalityService } from './nationality.service';
import { NationalityType } from './types/nationality.type';

@Resolver(of => NationalityType)
export class NationalityResolver {
  constructor(private nationalityService: NationalityService) {}

  @Query(returns => NationalityType)
  public async getNationalityById(
    @Args('getNationalityByIdInput')
    getNationalityByIdInput: GetNationalityByIdInput,
  ): Promise<NationalityType> {
    return this.nationalityService.getNationalityById(getNationalityByIdInput);
  }
  @Query(returns => [NationalityType])
  public async getAllNationalities(): Promise<NationalityType[]> {
    return this.nationalityService.getAllNationalities();
  }
}
